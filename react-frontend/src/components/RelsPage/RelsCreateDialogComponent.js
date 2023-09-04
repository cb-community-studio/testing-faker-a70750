import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const RelsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [users, setusers] = useState([])
    const [categ, setcateg] = useState([])

    useEffect(() => {
        set_entity({});
    }, [props.show]);
    const onSave = async () => {
        let _data = {
            name: _entity.name,
            users: _entity.users,
            cate: _entity.cate,
        };

        setLoading(true);
        try {
            const result = await client.service("rels").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };
     useEffect(() => {
                //on mount
                client
                    .service("users")
                    .find({ query: { $limit: 100 } })
                    .then((res) => {
                        setusers(res.data);
                    })
                    .catch((error) => {
                        console.log({ error });
                        props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                    });
            }, []);
    useEffect(() => {
                //on mount
                client
                    .service("categ")
                    .find({ query: { $limit: 100 } })
                    .then((res) => {
                        setcateg(res.data);
                    })
                    .catch((error) => {
                        console.log({ error });
                        props.alert({ title: "Categ", type: "error", message: error.message || "Failed get categ" });
                    });
            }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    const usersOptions = users.map((elem) => ({ label: elem.name, value: elem._id }));
    const categOptions = categ.map((elem) => ({ label: elem.names, value: elem._id }));

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="rels-create-dialog-component">
            <div>
                <p className="m-0">Name:</p>
                <InputText className="w-full mb-3" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">User Name:</p>
                <MultiSelect value={_entity?.users} options={usersOptions} onChange={(e) => setValByKey("users", e.value)} />
            </div>
            <div>
                <p className="m-0">Category:</p>
                <MultiSelect value={_entity?.cate} options={categOptions} onChange={(e) => setValByKey("cate", e.value)} />
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    return {}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(RelsCreateDialogComponent);
