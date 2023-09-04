import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import client from "../../services/restClient";


const SingleRelsPage = (props) => {
    const history = useHistory();
    const urlParams = useParams();
    const [data, setData] = useState();
    const [users, setusers] = useState([]);
    const [categ, setcateg] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("rels")
            .get(urlParams.singleRelsId, { query: { $populate: ["users","cate"] }})
            .then((res) => {
                setData(res.data || {});
                const users = Array.isArray(res.users)
            ? res.users.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.users
                ? [{ _id: res.users._id, name: res.users.name }]
                : [];
        setusers(users);
                setusers(res.data[0]?.users?.map((elem) => ({ _id: elem._id, name: elem.name })) || []);
                const categ = Array.isArray(res.cate)
            ? res.cate.map((elem) => ({ _id: elem._id, names: elem.names }))
            : res.cate
                ? [{ _id: res.cate._id, names: res.cate.names }]
                : [];
        setcateg(categ);
                setcateg(res.data[0]?.cate?.map((elem) => ({ _id: elem._id, names: elem.names })) || []);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Rels", type: "error", message: error.message || "Failed get rels" });
            });
    }, []);

    const goBack = () => {
        history.replace("/rels");
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Rels</h3>
                </div>
                <p>rels/{urlParams.singleRelsId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm">User Name</label>
                    <p className="m-0" >{data?.users}</p>
                    <label className="text-sm">Category</label>
                    <p className="m-0" >{data?.cate}</p>
            <label className="text-sm">User Name</label>
            {users.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p>{elem.name}</p>
                        </div>
                    </Link>
                ))}
            <label className="text-sm">Category</label>
            {categ.map((elem) => (
                    <Link key={elem._id} to={`/categ/${elem._id}`}>
                        <div className="card">
                            <p>{elem.names}</p>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleRelsPage);
