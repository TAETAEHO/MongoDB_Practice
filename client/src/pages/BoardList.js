import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Table from "../component/Table";
import TableColumn from "../component/TableColumn";
import TableRow from "../component/TableRow";

const BoardsList = (props) => {
  const [dataList, setDataList] = useState([]);
  const [boardDataUpdated, setBoardDataUpdated] = useState(false);
  const [boardDataCreated, setBoardDataCreated] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [boardWriter, setBoardWriter] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [boardNum, setBoardNum] = useState(0);

  useEffect(() => {
    axios
      .get("https://localhost:80/board")
      .then((res) => {
        setDataList(res.data.payload);
      })
      .catch((err) => console.log(err));
  }, []);

  const onClickDelete = (itemId) => {
    let deleteData = dataList.filter((el) => el.id === itemId);

    let id = deleteData[0].id;
    let title = deleteData[0].title;
    let writer = deleteData[0].writer;
    let content = deleteData[0].content;

    axios
      .delete(
        "https://localhost:80/board",
        {
          data: {
            id,
            title,
            writer,
            content,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        axios
          .get("https://localhost:80/board")
          .then((res) => {
            setDataList(res.data.payload);
          })
          .catch((err) => console.log(err));
      });
  };

  const onClickUpdate = (itemId) => {
    setBoardNum(itemId);
    setBoardDataUpdated(true);
  };

  const onClickCreate = () => {
    setBoardDataUpdated(true);
    setBoardDataCreated(true);
  };

  const onChangeBoardData = (e) => {
    setBoardTitle(document.getElementById("boardTitle").value);
    setBoardWriter(document.getElementById("boardWriter").value);
    setBoardContent(document.getElementById("boardContent").value);
  };

  const onClickUpdateComplete = () => {
    setBoardDataUpdated(false);

    axios
      .put("https://localhost:80/board", {
        id: boardNum,
        title: boardTitle,
        writer: boardWriter,
        content: boardContent,
      })
      .then(() => {
        axios
          .get("https://localhost:80/board")
          .then((res) => {
            setDataList(res.data.payload);
          })
          .catch((err) => console.log(err));
      });
  };

  const onClickCreateComplete = () => {
    setBoardDataCreated(false);
    setBoardDataUpdated(false);
    axios
      .post("https://localhost:80/board", {
        title: boardTitle,
        writer: boardWriter,
        content: boardContent,
      })
      .then(() => {
        window.location.reload();
      });
  };

  const onClickReload = () => {
    window.location.reload();
  };

  const onClickSortByDate = () => {
    setDataList(
      dataList.sort((a, b) => {
        return a.createdAt < b.createdAt
          ? -1
          : a.createdAt > b.createdAt
          ? 1
          : 0;
      })
    );
  };

  return (
    <>
      <Table headersName={["??????", "??????", "?????????", "??????", "?????????"]}>
        {dataList
          ? dataList.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableColumn>{item.id}</TableColumn>
                  <TableColumn>{item.title}</TableColumn>
                  <TableColumn>{item.writer}</TableColumn>
                  <TableColumn>{item.content}</TableColumn>
                  <TableColumn>{item.createdAt}</TableColumn>
                  <button onClick={() => onClickDelete(item.id)}>??????</button>
                  <button onClick={() => onClickUpdate(item.id)}>??????</button>
                </TableRow>
              );
            })
          : ""}
      </Table>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={onClickCreate}>??????</button>
        <button onClick={onClickReload}>????????????</button>
        <button onClick={onClickSortByDate}>????????? ?????? ??????</button>
      </div>
      {boardDataUpdated === true ? (
        <div>
          <div
            className="modalBackDrop"
            style={{
              position: "fixed",
              zIndex: "999",
              top: "0",
              left: "0",
              bottom: "0",
              right: "0",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "grid",
              placeItems: "center",
              height: "100vh",
            }}
          >
            <div
              className="modalView"
              style={{
                boxSizing: "border-box",
                backgroundColor: "white",
                position: "relative",
                textAlign: "center",
                paddingTop: "1.1rem",
                width: "50rem",
                height: "50rem",
              }}
            >
              {boardDataCreated == true ? (
                <div className="content">????????? ??????</div>
              ) : (
                <div className="content">????????? ??????</div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div>
                  <span>??????</span>
                  <input
                    id="boardTitle"
                    style={{ padding: "1rem", margin: "4rem" }}
                    type="text"
                    onChange={(e) => onChangeBoardData(e)}
                  />
                </div>
                <div>
                  <span>?????????</span>
                  <input
                    id="boardWriter"
                    style={{ padding: "1rem", margin: "4rem" }}
                    type="text"
                    onChange={(e) => onChangeBoardData(e)}
                  />
                </div>
                <div>
                  <span>??????</span>
                  <input
                    id="boardContent"
                    style={{ padding: "1rem", margin: "4rem" }}
                    type="text"
                    onChange={(e) => onChangeBoardData(e)}
                  />
                </div>
                <div>
                  {boardDataCreated == true ? (
                    <button
                      style={{ padding: "1rem", margin: "4rem" }}
                      onClick={onClickCreateComplete}
                    >
                      ????????? ??????
                    </button>
                  ) : (
                    <button
                      style={{ padding: "1rem", margin: "4rem" }}
                      onClick={onClickUpdateComplete}
                    >
                      ????????????
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BoardsList;
