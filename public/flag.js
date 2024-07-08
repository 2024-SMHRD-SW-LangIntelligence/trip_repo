// 국가 목록 배열
const countries = [
    { name: 'Andorra', isoCode: 'AD' },
    { name: 'Afghanistan', isoCode: 'AF' },
    { name: 'Antigua and Barbuda', isoCode: 'AG' },
    { name: 'Albania', isoCode: 'AL' },
    { name: 'Armenia', isoCode: 'AM' },
    { name: 'Angola', isoCode: 'AO' },
    { name: 'Argentina', isoCode: 'AR' },
    { name: 'Austria', isoCode: 'AT' },
    { name: 'Australia', isoCode: 'AU' },
    { name: 'Azerbaijan', isoCode: 'AZ' },
    { name: 'Bosnia and Herzegovina', isoCode: 'BA' },
    { name: 'Barbados', isoCode: 'BB' },
    { name: 'Bangladesh', isoCode: 'BD' },
    { name: 'Belgium', isoCode: 'BE' },
    { name: 'Burkina Faso', isoCode: 'BF' },
    { name: 'Bulgaria', isoCode: 'BG' },
    { name: 'Bahrain', isoCode: 'BH' },
    { name: 'Burundi', isoCode: 'BI' },
    { name: 'Brunei', isoCode: 'BN' },
    { name: 'Bolivia', isoCode: 'BO' },
    { name: 'Brazil', isoCode: 'BR' },
    { name: 'Bahamas', isoCode: 'BS' },
    { name: 'Bhutan', isoCode: 'BT' },
    { name: 'Botswana', isoCode: 'BW' },
    { name: 'Belarus', isoCode: 'BY' },
    { name: 'Belize', isoCode: 'BZ' },
    { name: 'Canada', isoCode: 'CA' },
    { name: 'Congo (Kinshasa)', isoCode: 'CD' },
    { name: 'Central African Republic', isoCode: 'CF' },
    { name: 'Congo (Brazzaville)', isoCode: 'CG' },
    { name: 'Switzerland', isoCode: 'CH' },
    { name: 'Ivory Coast', isoCode: 'CI' },
    { name: 'Cook Islands', isoCode: 'CK' },
    { name: 'Chile', isoCode: 'CL' },
    { name: 'Cameroon', isoCode: 'CM' },
    { name: 'China', isoCode: 'CN' },
    { name: 'Colombia', isoCode: 'CO' },
    { name: 'Costa Rica', isoCode: 'CR' },
    { name: 'Cuba', isoCode: 'CU' },
    { name: 'Cape Verde', isoCode: 'CV' },
    { name: 'Cyprus', isoCode: 'CY' },
    { name: 'Czech Republic', isoCode: 'CZ' },
    { name: 'Germany', isoCode: 'DE' },
    { name: 'Djibouti', isoCode: 'DJ' },
    { name: 'Denmark', isoCode: 'DK' },
    { name: 'Dominica', isoCode: 'DM' },
    { name: 'Dominican Republic', isoCode: 'DO' },
    { name: 'Algeria', isoCode: 'DZ' },
    { name: 'Ecuador', isoCode: 'EC' },
    { name: 'Estonia', isoCode: 'EE' },
    { name: 'Egypt', isoCode: 'EG' },
    { name: 'Eritrea', isoCode: 'ER' },
    { name: 'Spain', isoCode: 'ES' },
    { name: 'Ethiopia', isoCode: 'ET' },
    { name: 'Finland', isoCode: 'FI' },
    { name: 'Fiji', isoCode: 'FJ' },
    { name: 'Micronesia', isoCode: 'FM' },
    { name: 'France', isoCode: 'FR' },
    { name: 'Gabon', isoCode: 'GA' },
    { name: 'United Kingdom', isoCode: 'GB' },
    { name: 'Georgia', isoCode: 'GE' },
    { name: 'Ghana', isoCode: 'GH' },
    { name: 'Gambia', isoCode: 'GM' },
    { name: 'Guinea', isoCode: 'GN' },
    { name: 'Equatorial Guinea', isoCode: 'GQ' },
    { name: 'Greece', isoCode: 'GR' },
    { name: 'Guatemala', isoCode: 'GT' },
    { name: 'Guinea-Bissau', isoCode: 'GW' },
    { name: 'Guyana', isoCode: 'GY' },
    { name: 'Honduras', isoCode: 'HN' },
    { name: 'Croatia', isoCode: 'HR' },
    { name: 'Haiti', isoCode: 'HT' },
    { name: 'Hungary', isoCode: 'HU' },
    { name: 'Indonesia', isoCode: 'ID' },
    { name: 'Ireland', isoCode: 'IE' },
    { name: 'Israel', isoCode: 'IL' },
    { name: 'India', isoCode: 'IN' },
    { name: 'Iraq', isoCode: 'IQ' },
    { name: 'Iran', isoCode: 'IR' },
    { name: 'Iceland', isoCode: 'IS' },
    { name: 'Italy', isoCode: 'IT' },
    { name: 'Jamaica', isoCode: 'JM' },
    { name: 'Jordan', isoCode: 'JO' },
    { name: 'Japan', isoCode: 'JP' },
    { name: 'Kenya', isoCode: 'KE' },
    { name: 'Kyrgyzstan', isoCode: 'KG' },
    { name: 'Cambodia', isoCode: 'KH' },
    { name: 'Kiribati', isoCode: 'KI' },
    { name: 'Comoros', isoCode: 'KM' },
    { name: 'Saint Kitts and Nevis', isoCode: 'KN' },
    { name: 'North Korea', isoCode: 'KP' },
    { name: 'South Korea', isoCode: 'KR' },
    { name: 'Kuwait', isoCode: 'KW' },
    { name: 'Kazakhstan', isoCode: 'KZ' },
    { name: 'Laos', isoCode: 'LA' },
    { name: 'Lebanon', isoCode: 'LB' },
    { name: 'Saint Lucia', isoCode: 'LC' },
    { name: 'Liechtenstein', isoCode: 'LI' },
    { name: 'Sri Lanka', isoCode: 'LK' },
    { name: 'Liberia', isoCode: 'LR' },
    { name: 'Lesotho', isoCode: 'LS' },
    { name: 'Lithuania', isoCode: 'LT' },
    { name: 'Luxembourg', isoCode: 'LU' },
    { name: 'Latvia', isoCode: 'LV' },
    { name: 'Libya', isoCode: 'LY' },
    { name: 'Morocco', isoCode: 'MA' },
    { name: 'Monaco', isoCode: 'MC' },
    { name: 'Moldova', isoCode: 'MD' },
    { name: 'Montenegro', isoCode: 'ME' },
    { name: 'Madagascar', isoCode: 'MG' },
    { name: 'Marshall Islands', isoCode: 'MH' },
    { name: 'Macedonia', isoCode: 'MK' },
    { name: 'Mali', isoCode: 'ML' },
    { name: 'Myanmar', isoCode: 'MM' },
    { name: 'Mongolia', isoCode: 'MN' },
    { name: 'Mauritania', isoCode: 'MR' },
    { name: 'Malta', isoCode: 'MT' },
    { name: 'Mauritius', isoCode: 'MU' },
    { name: 'Maldives', isoCode: 'MV' },
    { name: 'Malawi', isoCode: 'MW' },
    { name: 'Mexico', isoCode: 'MX' },
    { name: 'Malaysia', isoCode: 'MY' },
    { name: 'Mozambique', isoCode: 'MZ' },
    { name: 'Netherlands', isoCode: 'NL' },
    { name: 'Norway', isoCode: 'NO' },
    { name: 'Nepal', isoCode: 'NP' },
    { name: 'Nauru', isoCode: 'NR' },
    { name: 'New Zealand', isoCode: 'NZ' },
    { name: 'Oman', isoCode: 'OM' },
    { name: 'Panama', isoCode: 'PA' },
    { name: 'Peru', isoCode: 'PE' },
    { name: 'Papua New Guinea', isoCode: 'PG' },
    { name: 'Philippines', isoCode: 'PH' },
    { name: 'Pakistan', isoCode: 'PK' },
    { name: 'Poland', isoCode: 'PL' },
    { name: 'Portugal', isoCode: 'PT' },
    { name: 'Palau', isoCode: 'PW' },
    { name: 'Paraguay', isoCode: 'PY' },
    { name: 'Qatar', isoCode: 'QA' },
    { name: 'Romania', isoCode: 'RO' },
    { name: 'Serbia', isoCode: 'RS' },
    { name: 'Russia', isoCode: 'RU' },
    { name: 'Rwanda', isoCode: 'RW' },
    { name: 'Saudi Arabia', isoCode: 'SA' },
    { name: 'Solomon Islands', isoCode: 'SB' },
    { name: 'Seychelles', isoCode: 'SC' },
    { name: 'Sudan', isoCode: 'SD' },
    { name: 'Sweden', isoCode: 'SE' },
    { name: 'Singapore', isoCode: 'SG' },
    { name: 'Slovenia', isoCode: 'SI' },
    { name: 'Slovakia', isoCode: 'SK' },
    { name: 'Sierra Leone', isoCode: 'SL' },
    { name: 'San Marino', isoCode: 'SM' },
    { name: 'Senegal', isoCode: 'SN' },
    { name: 'Somalia', isoCode: 'SO' },
    { name: 'Suriname', isoCode: 'SR' },
    { name: 'South Sudan', isoCode: 'SS' },
    { name: 'Sao Tome and Principe', isoCode: 'ST' },
    { name: 'El Salvador', isoCode: 'SV' },
    { name: 'Syria', isoCode: 'SY' },
    { name: 'Eswatini', isoCode: 'SZ' },
    { name: 'Chad', isoCode: 'TD' },
    { name: 'Togo', isoCode: 'TG' },
    { name: 'Thailand', isoCode: 'TH' },
    { name: 'Tajikistan', isoCode: 'TJ' },
    { name: 'Timor-Leste', isoCode: 'TL' },
    { name: 'Turkmenistan', isoCode: 'TM' },
    { name: 'Tunisia', isoCode: 'TN' },
    { name: 'Tonga', isoCode: 'TO' },
    { name: 'Turkey', isoCode: 'TR' },
    { name: 'Trinidad and Tobago', isoCode: 'TT' },
    { name: 'Tuvalu', isoCode: 'TV' },
    { name: 'Tanzania', isoCode: 'TZ' },
    { name: 'Ukraine', isoCode: 'UA' },
    { name: 'Uganda', isoCode: 'UG' },
    { name: 'United States', isoCode: 'US' },
    { name: 'Uruguay', isoCode: 'UY' },
    { name: 'Uzbekistan', isoCode: 'UZ' },
    { name: 'Vatican City', isoCode: 'VA' },
    { name: 'Saint Vincent and the Grenadines', isoCode: 'VC' },
    { name: 'Venezuela', isoCode: 'VE' },
    { name: 'Vietnam', isoCode: 'VN' },
    { name: 'Vanuatu', isoCode: 'VU' },
    { name: 'Samoa', isoCode: 'WS' },
    { name: 'Kosovo', isoCode: 'XK' },
    { name: 'Yemen', isoCode: 'YE' },
    { name: 'South Africa', isoCode: 'ZA' },
    { name: 'Zambia', isoCode: 'ZM' },
    { name: 'Zimbabwe', isoCode: 'ZW' }
];

// 특정 ISO 코드에 대한 국기 데이터 가져오기
async function fetchFlagDataByCountry(isoCode) {
    try {
        const country = countries.find(country => country.isoCode.toLowerCase() === isoCode.toLowerCase());

        if (!country) {
            console.error('해당 ISO 코드로 국가를 찾을 수 없습니다.');
            return null;
        }

        const flagUrl = `./image/외교부_국가·지역별 국기 이미지 (2)/${country.isoCode.toLowerCase()}.gif`;
        return { name: country.name, isoCode: country.isoCode, url: flagUrl };
    } catch (error) {
        console.error('국기 데이터를 가져오는 중 오류 발생:', error);
        return null;
    }
}

// 특정 국가의 국기 데이터를 가져와서 표시하는 함수
async function displayCountryFlag(isoCode) {
    const flagData = await fetchFlagDataByCountry(isoCode);
    const sidebarFlag = document.getElementById('sidebarflag');
    sidebarFlag.innerHTML = ''; // 기존 내용 초기화

    if (!flagData) {
        sidebarFlag.innerHTML = '<p>해당 국가의 국기를 찾을 수 없습니다.</p>';
        return;
    }


    const flagUrl = flagData.url; // 국기 이미지 상대 경로

    // HTML 요소 생성
    const flagItem = document.createElement('div');
    flagItem.className = 'flag-item';
    flagItem.innerHTML = `
    
        <img src="${flagUrl}" alt="Flag of ${countryName}" onerror="this.onerror=null; this.src='./default-flag.gif';">
    `;

    // 사이드바에 추가
    sidebarFlag.appendChild(flagItem);
}

// 검색 기능 구현
function searchCountry() {
    const searchInput = document.getElementById('searchInput').value.trim().toUpperCase();
    const country = countries.find(c => c.name.toUpperCase() === searchInput || c.isoCode === searchInput);
    if (country) {
        displayCountryFlag(country.isoCode);
        // 추가로 국가 정보를 사이드바에 표시하려면 여기에 추가
    } else {
        alert('해당 국가를 찾을 수 없습니다.');
    }
}

// 페이지 로드 시 검색 버튼에 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchButton').addEventListener('click', searchCountry);
});


