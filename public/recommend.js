function toggleRecommendInput() {
    const countryName = prompt("국가명을 입력하세요 (예: South Korea, United States):");
    if (countryName) {
        fetch('/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ country_name: countryName })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버에서 데이터를 가져오지 못했습니다.');
            }
            return response.json();
        })
        .then(data => {
            const recommendedCountries = data.recommended_countries;
            const countriesList = recommendedCountries.join(', ');
            alert(`추천 국가: ${countriesList}`);
        })
        .catch(error => {
            console.error('데이터 가져오기 중 오류 발생:', error);
            alert('데이터를 가져오는 중 오류가 발생했습니다.');
        });
    }
}



