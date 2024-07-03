const express = require("express");
const oracledb = require("oracledb");
const path = require("path");

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

// 데이터베이스 쿼리 실행 함수
async function getDatadb(query) {
    let connection;
    try {
        connection = await initdb();
        const result = await connection.execute(query);
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

// 정적 파일 제공
const publicPath = path.join(__dirname, 'public'); // public 디렉토리 경로 설정
const imagePath = path.join(__dirname, 'image');
app.use('/image', express.static(imagePath));
app.use(express.static(publicPath));

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
