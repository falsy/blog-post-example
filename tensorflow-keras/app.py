from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import requests
from io import BytesIO
from PIL import Image

app = Flask(__name__)

# 모델 로드
model = load_model('cat_detector_model.keras')

def is_cat(img_url):
    response = requests.get(img_url)
    response.raise_for_status()

    img = Image.open(BytesIO(response.content)).convert('RGB')
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    # 예측
    prediction = model.predict(img_array)
    return float(prediction[0][0])

@app.route('/predict', methods=['GET'])
def predict():
    img_url = request.args.get('imgURL')

    if not img_url:
        return jsonify({"error": "imgURL parameter is required"}), 400

    try:
        result = is_cat(img_url)
        return jsonify({ 'prediction': result })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7777)