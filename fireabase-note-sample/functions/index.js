// 기본 functions 모듈을 불러오고
const functions = require('firebase-functions');
// 다른 서비스에 쉽게 접근하기 위한 모듈로 보입니다
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// api가 추가되더라도 디비 접근이 빈번하게 있을것 같아서 변수에 담아두고
const db = admin.firestore();
// 다른 도메인에서도 통신이 되도록 cors를 열어두고
const cors = require('cors')({origin: true});

// '/noteText' 라는 path 로 접근하면
exports.noteText = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // 약간의 암호화... url 스트링 파람값에 ?pw=1234 가 있어야만 하도록
    if(req.query.pw !== '1234') return res.status(403).send('권한이 없습니다.');
    
    // 디비에 'note' 컬렉션에 'textarea' 문서를 불러오고
    db.collection('note').doc('textarea').get().then(doc => {
      // 성공하면 문서안의 'text'필드 값을 응답해 줍니다.
      return res.status(200).send({ reuslt : doc.data().text });
    }).catch(err => {
      console.log('Error', err);
    });
  });
});

exports.updateNoteText = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // 역시 약간의 암호화...
    if(req.query.pw !== '1234') return res.status(403).send('권한이 없습니다.');
    
    // textarea 문서에 변화를 확인해서 업데이트가 되면 성공 응답을 보내줍니다.
    db.collection('note').doc('textarea').onSnapshot(doc => {
      return res.status(200).send({ result: true });
    });

    // 디비에 'note' 컬렉션에 'textarea' 문서의 'text' 필드의 값을 요청값 body의 text 값으로 업데이트 해줍니다.
    db.collection('note').doc('textarea').update({ text: req.body.text });
  });
});