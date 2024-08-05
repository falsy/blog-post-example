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
    # 이미지 다운로드
    response = requests.get(img_url)
    response.raise_for_status()  # 요청이 성공하지 않으면 예외 발생
    img = Image.open(BytesIO(response.content)).convert('RGB')

    # 이미지 전처리
    img = img.resize((150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    # 예측
    prediction = model.predict(img_array)
    return prediction[0][0] < 0.5

@app.route('/predict', methods=['GET'])
def predict():
    img_url = request.args.get('imgURL')

    if not img_url:
        return jsonify({"error": "imgURL parameter is required"}), 400

    try:
        result = is_cat(img_url)
        return jsonify({'is_cat': bool(result)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7777)