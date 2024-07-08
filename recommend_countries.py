# import pandas as pd
# from sklearn.metrics.pairwise import cosine_similarity
# import json
# import sys

# def recommend_similar_countries(target_iso, top_n=3):
#     try:
#         df_data = pd.read_csv('al_data.csv')  # 적절한 경로로 수정하세요
#     except FileNotFoundError:
#         print(json.dumps({"error": "File not found"}))
#         return

#     # ISO 코드(b_iso)를 기준으로 국가별 정보를 합산
#     df_sum = df_data.groupby('b_iso').sum()

#     # 해당 ISO 코드의 인덱스 가져오기
#     try:
#         index = df_sum.index.get_loc(target_iso)
#     except KeyError:
#         print(json.dumps({"error": "ISO code not found"}))
#         return

#     # 해당 ISO 코드와 다른 국가들 간의 코사인 유사도 계산
#     similarities = cosine_similarity(df_sum.values[index:index+1], df_sum.values)[0]

#     # 유사도가 높은 순서로 정렬하여 top_n개의 인덱스 추출 (자기 자신은 제외)
#     similar_indices = similarities.argsort()[-top_n-1:-1][::-1]

#     # 추천할 국가들의 ISO 코드 반환
#     recommended_countries = df_sum.iloc[similar_indices].index.tolist()

#     output = {"recommended_countries": recommended_countries}
#     print(json.dumps(output))  # JSON 형식으로 출력

# if __name__ == "__main__":
#     if len(sys.argv) < 2:
#         print(json.dumps({"error": "ISO code not provided"}))
#     else:
#         target_iso = sys.argv[1]
#         recommend_similar_countries(target_iso)

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import json
import sys

def recommend_similar_countries(target_iso, top_n=3):
    try:
        df_data = pd.read_csv('al_data.csv')  # 적절한 경로로 수정하세요
    except FileNotFoundError:
        print(json.dumps({"error": "File not found"}))
        return

    # ISO 코드(b_iso)를 기준으로 국가별 정보를 합산
    df_sum = df_data.groupby('b_iso').sum()

    # 해당 ISO 코드의 인덱스 가져오기
    try:
        index = df_sum.index.get_loc(target_iso)
    except KeyError:
        print(json.dumps({"error": "ISO code not found"}))
        return

    # 해당 ISO 코드와 다른 국가들 간의 코사인 유사도 계산
    similarities = cosine_similarity(df_sum.values[index:index+1], df_sum.values)[0]

    # 유사도가 높은 순서로 정렬하여 top_n개의 인덱스 추출 (자기 자신은 제외)
    similar_indices = similarities.argsort()[-top_n-1:-1][::-1]

    # 추천할 국가들의 ISO 코드 반환
    recommended_countries = df_sum.iloc[similar_indices].index.tolist()

    output = {"recommended_countries": recommended_countries}
    print(json.dumps(output))  # JSON 형식으로 출력

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "ISO code not provided"}))
    else:
        target_iso = sys.argv[1]
        recommend_similar_countries(target_iso)
