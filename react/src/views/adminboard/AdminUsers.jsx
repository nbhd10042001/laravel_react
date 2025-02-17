import React, { useEffect, useState } from "react";
import PageComponent from "../../components/PageComponent";
import axiosClient from "../../axios";
import { Spinner } from "flowbite-react";
import PaginationLinks from "../../components/PaginationLinks";
import UserList from "./component/UserList";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [links, setLinks] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const onPageClick = (url) => {
    getUsers(url);
  };

  const getUsers = (url) => {
    url = url || "/admin/users";

    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setUsers(data.data);
        setMeta(data.meta);
        setLinks(data.links);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <PageComponent title={"Manage Users"}>
      {loading && (
        <div className="text-center text-lg text-medium my-32">
          Loading data... <Spinner color="warning"></Spinner>
        </div>
      )}
      {!loading && (
        <div>
          <UserList users={users}></UserList>
        </div>
      )}
      {meta.links && (
        <PaginationLinks
          meta={meta}
          links={links}
          onPageClick={onPageClick}
        ></PaginationLinks>
      )}
    </PageComponent>
  );
}
