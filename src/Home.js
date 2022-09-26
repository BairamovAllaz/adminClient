import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AiOutlineDelete } from "react-icons/ai";
import { TbLock } from "react-icons/tb";
import { TbLockOpen } from "react-icons/tb";
import { AiOutlineLogout } from "react-icons/ai";
import styled from "styled-components";
import Table from "./Components/Table";
import CircularJSON from "circular-json";
import "./Home.css";

const Styles = styled.div`
  padding: 1rem;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8100/user/getusers")
      .then(data => data.json())
      .then(js => {
        setUsers(js);
        let isExist = js.some(a => localStorage.getItem("Id") == a.Id);
        if (isExist === false) {
          navigate("/Login");
        }
        let obj = js.find(o => o.Id == localStorage.getItem("Id"));
        if(obj.status == "Blocked") { 
          navigate("/Login");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "first_name",
          },
          {
            Header: "Last Name",
            accessor: "last_name",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Email",
            accessor: "email",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Registration Time",
            accessor: "registration_time",
          },
        ],
      },
    ],
    []
  );

  const [selectedRowCount, setSelectedRowCount] = React.useState(0);
  const handleChangeSelection = React.useCallback(
    count => {
      setSelectedRowCount(count);
    },
    [setSelectedRowCount]
  );

  const handle = parametr => {
    setSelectedRows(parametr);
  };

  const Delete = () => {
    const loginUrl = "http://localhost:8100/user/delete";

    selectedRows.map(data => {
      fetch(loginUrl, {
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.original),
        method: "DELETE",
      })
        .then(res => {
          if (res.ok) {
            console.log("ok");
          } else {
            console.log(
              "From server: " +
                res.text().then(text => {
                  console.log(text);
                  alert(text);
                })
            );
          }
        })
        .catch(err => {
          console.log("There is something: " + err.message);
        });
    });
    window.location.reload(0);
  };

  const logOut = () => {
    localStorage.clear();
    window.location.reload(false);
  };

  const Update = typeu => {
    const loginUrl = `http://localhost:8100/user/${typeu}`;
    selectedRows.map(data => {
      fetch(loginUrl, {
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.original),
        method: "PUT",
      })
        .then(res => {
          if (res.ok) {
            console.log("ok");
          } else {
            console.log(
              "From server: " +
                res.text().then(text => {
                  console.log(text);
                  alert(text);
                })
            );
          }
        })
        .catch(err => {
          console.log("There is something: " + err.message);
        });
      window.location.reload(0);
    });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://p7.hiclipart.com/preview/429/434/396/computer-icons-icon-design-business-administration-clip-art-admin-icon.jpg"
              width="40"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            <span>Admin Panel</span>
          </Navbar.Brand>
          <Navbar.Brand href="#home">
            <Button className="But" variant="danger" onClick={Delete}>
              <AiOutlineDelete />
            </Button>
            <Button
              className="But"
              variant="secondary"
              onClick={() => Update("Block")}
            >
              <TbLock />
            </Button>
            <Button
              className="But"
              variant="secondary"
              onClick={() => Update("UnBlock")}
            >
              <TbLockOpen />
            </Button>
            <Button className="But" variant="success" onClick={logOut}>
              <AiOutlineLogout />
            </Button>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Styles>
        <Table
          columns={columns}
          data={users}
          onChangeSelection={handleChangeSelection}
          setSelectedRows={handle}
        />
      </Styles>
    </>
  );
}
export default Home;
