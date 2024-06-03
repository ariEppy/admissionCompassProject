from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import matplotlib
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from model import preprocess_data, compute_shap_values, X_train
import numpy as np
import shap

matplotlib.use('Agg')

# Create a Flask application instance
app = Flask(__name__)


CORS(app, resources={r"/*": {"origins": "*"}})

# Load the dataset and model
df = pd.read_csv('student_data_final_testing.csv')
# Mapping for degree types
degree_mapping = {'B.Sc.': 1, 'M.Sc.': 2, 'B.A.': 3, 'M.A.': 4}  # Assign 0 to represent unknown types
# Convert string values to numeric
df['Type'] = df['Type'].map(degree_mapping)

# Load the model and feature names
with open('feature_names.pkl', 'rb') as f:
    feature_names = pickle.load(f)
rf = pickle.load(open('rf.pkl', 'rb'))
dt = pickle.load(open('dt.pkl', 'rb'))
gaus = pickle.load(open('gaus.pkl', 'rb'))

# Define routes for handling requests
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message": "API is Running"
    }
    return jsonify(data)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        query_df = preprocess_data(data, feature_names)

        prediction1 = rf.predict(query_df)
        prediction1 = list(map(int, prediction1))

        prediction2 = dt.predict(query_df)
        prediction2 = list(map(int, prediction2))

        prediction3 = gaus.predict(query_df)
        prediction3 = list(map(int, prediction3))

        accuracy_dt = 79.00
        accuracy_rf = 84.00
        accuracy_gaus = 74.00
        total_accuracy = accuracy_dt + accuracy_rf + accuracy_gaus
        weight_dt = accuracy_dt / total_accuracy
        weight_rf = accuracy_rf / total_accuracy
        weight_gaus = accuracy_gaus / total_accuracy
        print(prediction1[0])
        print(prediction2[0])
        print(prediction3[0])

        prediction_final = int(((prediction2[0]*weight_dt) + (prediction1[0]*weight_rf) + (prediction3[0]*weight_gaus)) * 100)
        print(prediction_final) 
        return jsonify({'Prediction': prediction_final})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/shap', methods=['POST'])
def shap_analysis():
    
    try:
        data = request.get_json()
        institution_id = data.get('institution_id', None)
        Type = data.get('Type', None)
        degree_id = data.get('degree_id', None)
        
        # Filter data based on institution ID or degree ID
        filtered_data = df
        if institution_id is not None:
            filtered_data = filtered_data[filtered_data['institution_id'] == institution_id]
        if Type is not None:
            filtered_data = filtered_data[filtered_data['Type'] == Type]
        if degree_id is not None:
            filtered_data = filtered_data[filtered_data['degree_id'] == degree_id]
        
        print(filtered_data)
        # Preprocess the filtered data
        X_filtered = filtered_data.drop('accepted', axis=1)
        
        # Compute SHAP values
        shap_values1 = compute_shap_values(rf, X_train, X_filtered)
        shap_values2 = compute_shap_values(dt, X_train, X_filtered)
        
        
        shap_values_for_positive_class1 = shap_values1.values[..., 1]
        shap_values_for_positive_class2 = shap_values2.values[..., 1]
        

        # Ensure the shapes match
        assert shap_values_for_positive_class1.shape[0] == X_filtered.shape[0], "Mismatch in number of rows between SHAP values and filtered data"
        assert shap_values_for_positive_class1.shape[1] == X_filtered.shape[1], "Mismatch in number of columns between SHAP values and filtered data"
        assert shap_values_for_positive_class2.shape[0] == X_filtered.shape[0], "Mismatch in number of rows between SHAP values and filtered data"
        assert shap_values_for_positive_class2.shape[1] == X_filtered.shape[1], "Mismatch in number of columns between SHAP values and filtered data"
       
        # Calculate mean absolute SHAP value for each feature
        feature_importances1 = np.mean(np.abs(shap_values_for_positive_class1), axis=0)
        feature_importances2 = np.mean(np.abs(shap_values_for_positive_class2), axis=0)
        
        # Create a DataFrame to display the feature importances
        feature_importances_df1 = pd.DataFrame({
            'Feature': feature_names,
            'Importance': feature_importances1
        })
         # Create a DataFrame to display the feature importances
        feature_importances_df2 = pd.DataFrame({
            'Feature': feature_names,
            'Importance': feature_importances2
        })
        
        # Merge feature importances from both models based on feature names
        merged_feature_importances = pd.merge(feature_importances_df1, feature_importances_df2, on='Feature', suffixes=('_1', '_2'))
        
        # Sum up the importance scores from both models
        merged_feature_importances['Total_Importance'] = merged_feature_importances['Importance_1'] + merged_feature_importances['Importance_2']
        
        # Rank features based on total importance scores
        ranked_features = merged_feature_importances.sort_values(by='Total_Importance', ascending=False)

        # Convert the ranked features DataFrame to JSON and return as response
        ranked_features =ranked_features.drop(['Importance_1', 'Importance_2'],axis=1)
     
        ranked_features_json = ranked_features.to_json(orient='records')
        
        return ranked_features_json
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
