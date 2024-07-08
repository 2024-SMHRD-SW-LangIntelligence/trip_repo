const express = require("express");
const oracledb = require("oracledb");
const path = require("path");
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// 오라클 클라이언트 초기화
oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient-basic-windows.x64-23.4.0.24.05\\instantclient_23_4' });

const dbConfig = {
    user: 'campus_24SW_LI_p2_4',
    password: 'smhrd4',
    connectString: 'project-db-cgi.smhrd.com:1524/xe'
};

// 데이터베이스 연결 초기화
async function initdb() {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        console.log("데이터베이스에 연결되었습니다.");
        return connection;
    } catch (err) {
        console.error("데이터베이스 연결에 실패했습니다:", err);
        throw err;
    }
}

// CLOB 데이터를 문자열로 변환하는 함수
async function clobToString(clob) {
    return new Promise((resolve, reject) => {
        let clobString = '';
        clob.setEncoding('utf8');
        clob.on('data', chunk => {
            clobString += chunk;
        });
        clob.on('end', () => {
            resolve(clobString);
        }); 
        clob.on('error', err => {
            reject(err);
        });
    });
}

// 데이터베이스 쿼리 실행 함수
async function getDatadb(query) {
    let connection;
    try {
        connection = await initdb();
        const result = await connection.execute(query);
        if (result.metaData) {
            result.rows = await processClobRows(result.rows, result.metaData);
        }
        return result.rows;
    } catch (error) {
        console.error("데이터베이스를 가져오는 중에 오류가 발생하였습니다.", error);
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
                console.log("데이터베이스 연결이 닫혔습니다.");
            } catch (error) {
                console.error("데이터베이스 연결 닫기 실패:", error);
            }
        }
    }
}

// CLOB 데이터를 문자열로 변환하는 함수 (배열 처리)
async function processClobRows(rows, columns) {
    const processedRows = [];
    for (const row of rows) {
        const processedRow = [];
        for (let i = 0; i < row.length; i++) {
            if (columns[i].dbType === oracledb.DB_TYPE_CLOB && row[i] !== null) {
                processedRow.push(await clobToString(row[i]));
            } else {
                processedRow.push(row[i]);
            }
        }
        processedRows.push(processedRow);
    }
    return processedRows;
}

// API 엔드포인트: 클라이언트에 데이터 제공
app.get('/restaurants', async (req, res) => {
    try {
        const sidebarQuery = 'SELECT M_iso, M_address, M_name, M_starcnt, M_lat, M_long FROM t_michelin';
        const sidebarData = await getDatadb(sidebarQuery);
        res.json(sidebarData); // JSON 형식으로 데이터 전송
    } catch (error) {
        console.error('API 요청 처리 중 오류 발생:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/countries", async (req, res) => {
    try {
        const countryQuery = "Select * from t_country";
        const countryData = await getDatadb(countryQuery);
        res.json(countryData); // json 형식으로 데이터 전송하기
    } catch (error) {
        console.error("API 요청 처리 중 오류 발생:", error);
        res.status(500).json({error : error.message})
    }
});

app.get('/currencies', async (req, res) => {
    try {
        const currencyQuery = 'SELECT * FROM t_currency';
        const currencyData = await getDatadb(currencyQuery);
        res.json(currencyData); // JSON 형식으로 데이터 전송
    } catch (error) {
        console.error('API 요청 처리 중 오류 발생:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/climates', async (req, res) => {
    try {
        const climateQuery = 'SELECT * FROM t_climate';
        const climateData = await getDatadb(climateQuery);
        res.json(climateData); // JSON 형식으로 데이터 전송
    } catch (error) {
        console.error('API 요청 처리 중 오류 발생:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/emergency', async (req, res) => {
    try {
        const climateQuery = 'SELECT * FROM t_emergency';
        const climateData = await getDatadb(climateQuery);
        res.json(climateData); // JSON 형식으로 데이터 전송
    } catch (error) {
        console.error('API 요청 처리 중 오류 발생:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/budget', async (req, res) => {
    try {
        const climateQuery = 'SELECT * FROM t_budget';
        const climateData = await getDatadb(climateQuery);
        res.json(climateData); // JSON 형식으로 데이터 전송
    } catch (error) {
        console.error('API 요청 처리 중 오류 발생:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/infection', async (req, res) => {
    try {
        const climateQuery = 'SELECT * FROM t_infection';
        const climateData = await getDatadb(climateQuery);
        res.json(climateData); // JSON 형식으로 데이터 전송
    } catch (error) {
        console.error('API 요청 처리 중 오류 발생:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/risk', async (req, res) => {
    try {
        const climateQuery = 'SELECT * FROM t_risk';
        const climateData = await getDatadb(climateQuery);
        res.json(climateData); // JSON 형식으로 데이터 전송
    } catch (error) {
        console.error('API 요청 처리 중 오류 발생:', error);
        res.status(500).json({ error: error.message });
    }
});


app.get('/visa', async (req, res) => {
    try {
        const climateQuery = 'SELECT * FROM t_visa';
        const climateData = await getDatadb(climateQuery);
        res.json(climateData); // JSON 형식으로 데이터 전송
    } catch (error) {
        console.error('API 요청 처리 중 오류 발생:', error);
        res.status(500).json({ error: error.message });
    }
});

// JSON 형식의 본문을 파싱하기 위한 미들웨어
app.use(express.json());

// 국가명과 ISO 코드를 매핑하는 함수
function getIsoCode(countryName) {
    const data = fs.readFileSync('countries.csv', 'utf8');
    const lines = data.split('\n');
    for (const line of lines) {
        const [name, iso] = line.split(',');
        if (name.trim().toLowerCase() === countryName.trim().toLowerCase()) {
            return iso.trim();
        }
    }
    return null;
}

app.post('/recommend', (req, res) => {
    const { country_name } = req.body;

    if (!country_name) {
        return res.status(400).json({ error: "Country name not provided" });
    }

    const iso_code = getIsoCode(country_name);
    if (!iso_code) {
        return res.status(400).json({ error: "Invalid country name" });
    }

    const recommendCountriesPath = path.resolve(__dirname, 'recommend_countries.py');

    exec(`python ${recommendCountriesPath} ${iso_code}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`recommend_countries.py 스크립트 실행 중 오류 발생: ${error.message}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (stderr) {
            console.error(`recommend_countries.py 스크립트 stderr: ${stderr}`);
            return res.status(500).json({ error: 'Internal server error' });
        }

        try {
            const data = JSON.parse(stdout);
            const recommendedCountries = data.recommended_countries.map(getCountryName);
            res.json({ recommended_countries: recommendedCountries });
        } catch (e) {
            console.error('출력된 데이터 파싱 중 오류 발생:', e);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});


function getCountryName(isoCode) {
    const data = fs.readFileSync('countries.csv', 'utf8');
    const lines = data.split('\n');
    for (const line of lines) {
        const [name, iso] = line.split(',');
        if (iso.trim().toLowerCase() === isoCode.trim().toLowerCase()) {
            return name.trim();
        }
    }
    return isoCode;
}


// 정적 파일 제공
const publicPath = path.join(__dirname, 'public'); // public 디렉토리 경로 설정
const imagePath = path.join(__dirname, 'image');

app.use('/image', express.static(imagePath));
app.use(express.static(publicPath));


app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);

    // Python 스크립트 실행 (상대 경로로 설정)
    const convertCurrencyPath = path.resolve(__dirname, 'convert_currency.py');
    const convertClimatePath = path.resolve(__dirname, 'convert_climate.py');
    const recommendCountriesPath = path.resolve(__dirname, 'recommend_countries.py'); // 새로 추가한 Python 스크립트 경로 추가

    exec(`python ${convertCurrencyPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`convert_currency.py 스크립트 실행 중 오류 발생: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`convert_currency.py 스크립트 stderr: ${stderr}`);
            return;
        }
        console.log(`convert_currency.py 스크립트 stdout: ${stdout}`);
    });

    exec(`python ${convertClimatePath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`convert_climate.py 스크립트 실행 중 오류 발생: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`convert_climate.py 스크립트 stderr: ${stderr}`);
            return;
        }
        console.log(`convert_climate.py 스크립트 stdout: ${stdout}`);
    });

    exec(`python ${recommendCountriesPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`recommend_countries.py 스크립트 실행 중 오류 발생: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`recommend_countries.py 스크립트 stderr: ${stderr}`);
            return;
        }
        console.log(`recommend_countries.py stdout: ${stdout}`);
    });
});
