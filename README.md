## MongoDB 연습 (게시판)

<details>
    <summary>MongoParseError: options usecreateindex, usefindandmodify are not supported</summary>

- Mongoose 버전 6.0이상부터 useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false는 디폴트
- 따라서 작성하지 않아도 되며 제거 시 정상 동작

</details>
