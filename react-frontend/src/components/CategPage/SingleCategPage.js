import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import client from "../../services/restClient";


const SingleCategPage = (props) => {
    const history = useHistory();
    const urlParams = useParams();
    const [data, setData] = useState();
    
    useEffect(() => {
        //on mount
        client
            .service("categ")
            .get(urlParams.singleCategId, { query: { $populate: [] }})
            .then((res) => {
                setData(res.data || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Categ", type: "error", message: error.message || "Failed get categ" });
            });
    }, []);

    const goBack = () => {
        history.replace("/categ");
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Categ</h3>
                </div>
                <p>categ/{urlParams.singleCategId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm">names</label>
                    <p className="m-0" >{data?.names}</p>
            
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

export default connect(mapState, mapDispatch)(SingleCategPage);
