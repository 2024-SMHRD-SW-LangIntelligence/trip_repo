const oracledb = require('oracledb');

// Oracle Instant Client 설정
oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient-basic-windows.x64-23.4.0.24.05\\instantclient_23_4' });

async function run() {
  let connection;

  try {
    // 데이터베이스 연결
    connection = await oracledb.getConnection({
      user: 'campus_24SW_LI_p2_4',
      password: 'smhrd4',
      connectString: 'project-db-cgi.smhrd.com:1524/xe'
    });

    console.log('Successfully connected to Oracle Database');

    // 쿼리 실행
    const result = await connection.execute("SELECT * FROM t_country");
    console.log(result.rows);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        // 연결 해제
        await connection.close();
        console.log('Connection closed');
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();

