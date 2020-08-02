import React, { useContext, useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import { Table, Form } from "antd";
import ReactDragListView from "react-drag-listview";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { IconButton, TextField, Button, MenuItem } from "@material-ui/core";
import CardView from "./CardView";
import ReorderIcon from "@material-ui/icons/Reorder";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import ExposureIcon from "@material-ui/icons/Exposure";
import TodayIcon from "@material-ui/icons/Today";

const EditableContext = React.createContext();

const status = [
  { name: "working", color: "#fdab3d" },
  { name: "stuck", color: "#579bfc" },
  { name: "done", color: "#01c875" },
  { name: "critical", color: "#e2445b" },
];
const priority = [
  { name: "urgent", color: "#333333" },
  { name: "high", color: "#e2445b" },
  { name: "medium", color: "#794bd1" },
  { name: "low", color: "#579bfc" },
];

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (val, color) => {
    try {
      const values = {
        status: (
          <span className="status-btn" style={{ backgroundColor: color }}>
            {val}
          </span>
        ),
      };
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <div className="status-select">
        {status.map((item, i) => (
          <div
            className="status-list"
            style={{ backgroundColor: item.color }}
            key={i}
            ref={inputRef}
            onClick={() => save(item.name, item.color)}
          >
            {item.name}
          </div>
        ))}
      </div>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export class DragableTable extends React.Component {
  constructor(props) {
    super(props);
    this.addRowData = this.addRowData.bind(this);
    this.addColumnData = this.addColumnData.bind(this);
    this.state = {
      data: [
        {
          thingstodo: "Assignment 1",
          owner: (
            <p title="boron">
              <AccountCircleIcon />
            </p>
          ),
          status: (
            <span className="status-btn" style={{ backgroundColor: "#fdab3d" }}>
              working
            </span>
          ),
          dueDate: "Aug 1",
          priority: (
            <span className="status-btn" style={{ backgroundColor: "#333333" }}>
              urgent
            </span>
          ),
          key: Math.floor(Math.random() * 100)+4,
        },
        {
          thingstodo: "Assignment 2",
          owner: (
            <p title="clan">
              <AccountCircleIcon />
            </p>
          ),
          status: (
            <span className="status-btn" style={{ backgroundColor: "#579bfc" }}>
              stuck
            </span>
          ),
          dueDate: "Aug 10",
          priority: (
            <span className="status-btn" style={{ backgroundColor: "#e2445b" }}>
              high
            </span>
          ),
          key: Math.floor(Math.random() * 100)+1,
        },
        {
          thingstodo: "Assignment 3",
          owner: (
            <p title="clint">
              <AccountCircleIcon />
            </p>
          ),
          status: (
            <span className="status-btn" style={{ backgroundColor: "#01c875" }}>
              done
            </span>
          ),
          dueDate: "Aug 22",
          priority: (
            <span className="status-btn" style={{ backgroundColor: "#794bd1" }}>
              medium
            </span>
          ),
          key: Math.floor(Math.random() * 100)+2,
        },
        {
          thingstodo: "Assignment 4",
          owner: (
            <p title="jacob">
              <AccountCircleIcon />
            </p>
          ),
          status: (
            <span className="status-btn" style={{ backgroundColor: "#e2445b" }}>
              critical
            </span>
          ),
          dueDate: "Aug 24",
          priority: (
            <span className="status-btn" style={{ backgroundColor: "#579bfc" }}>
              low
            </span>
          ),
          key: Math.floor(Math.random() * 100)+3,
        },
      ],
      columns: [
        {
          key: "operate",
          render: (text, record, index) => {
            return {
              children: (
                <a className="drag-handle" href="#">
                  <DragIndicatorIcon />
                </a>
              ),
            };
          },
        },
        {
          title: (
            <h1 style={{ color: "#4291c2", fontSize: "1.5em" }}>
              Things to do
            </h1>
          ),
          dataIndex: "thingstodo",
        },
        {
          title: "Owner",
          dataIndex: "owner",
        },
        {
          title: "Status",
          dataIndex: "status",
          editable: true,
        },
        {
          title: "Due Date",
          dataIndex: "dueDate",
        },
        {
          title: "Priority",
          dataIndex: "priority",
        },
      ],
      addRow: false,
      addColumn: false,
    };

    const that = this;
    this.dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const columns = [...that.state.columns];
        const item = columns.splice(fromIndex, 1)[0];
        columns.splice(toIndex, 0, item);
        that.setState({
          columns,
        });
      },
      nodeSelector: "th",
    };
    this.dragPropsRow = {
      onDragEnd(fromIndex, toIndex) {
        const data = [...that.state.data];
        const item = data.splice(fromIndex, 1)[0];
        data.splice(toIndex, 0, item);
        that.setState({
          data,
        });
      },
      handleSelector: "a",
    };
  }

  addRowData = (val) => {
    this.setState({ addRow: false });
    let finaldata = val;
    let color = "";
    let prioritycolor = "";
    if (val.status) {
      status.map((item) => {
        if (item.name === val.status) {
          color = item.color;
        }
        return color;
      });
      finaldata.status = (
        <span className="status-btn" style={{ backgroundColor: color }}>
          {val.status}
        </span>
      );
    }
    if (val.priority) {
      priority.map((item) => {
        if (item.name === val.priority) {
          prioritycolor = item.color;
        }
        return prioritycolor;
      });
      finaldata.priority = (
        <span className="status-btn" style={{ backgroundColor: prioritycolor }}>
          {val.priority}
        </span>
      );
    }
    finaldata.owner = (
      <p title={val.owner}>
        <AccountCircleIcon />
      </p>
    );

    finaldata.id = Math.floor(Math.random() * 100);
    this.setState((state) => {
      const data = state.data.concat([finaldata]);
      return {
        data,
      };
    });
  };

  addColumnData = (val) => {
    const { columns } = this.state;
    this.setState({ addColumn: false });

    this.setState({
      columns: [
        ...columns,
        { title: val, dataIndex: val.toLowerCase(), editable: true },
      ],
    });
  };

  handleSave = (row) => {
    const newData = [...this.state.data];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      data: newData,
    });
  };

  render() {
    const { addRow, columns, data, addColumn } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columnsMod = columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div style={{ margin: "50px 20px" }}>
        <IconButton
          className="table-col-btn"
          onClick={() => this.setState({ addColumn: !addColumn })}
        >
          {!addColumn ? (
            <AddCircleOutlineIcon className="table-row-icon" />
          ) : (
            <RemoveCircleOutlineIcon className="table-row-icon" />
          )}
        </IconButton>
        {addColumn && (
          <SelectRow addColumnData={(val) => this.addColumnData(val)} />
        )}
        <ReactDragListView {...this.dragProps}>
          <ReactDragListView {...this.dragPropsRow}>
            <Table
              components={components}
              columns={columnsMod}
              pagination={false}
              dataSource={data}
              bordered
            />
          </ReactDragListView>
        </ReactDragListView>
        {addRow && (
          <AddRowForm
            columns={columns}
            addData={(val) => this.addRowData(val)}
          />
        )}
        <IconButton onClick={() => this.setState({ addRow: !addRow })}>
          {!addRow ? (
            <AddCircleOutlineIcon className="table-row-icon" />
          ) : (
            <RemoveCircleOutlineIcon className="table-row-icon" />
          )}
        </IconButton>
      </div>
    );
  }
}

const AddRowForm = ({ columns, addData }) => {
  const [values, setValues] = useState({
    thingstodo: "",
    owner: "",
    status: "",
    dueDate: "",
    priority: "",
  });

  const updateValues = (e) => {
    const val = e.target;
    setValues({
      ...values,
      [val.name]: val.value,
    });
  };
  return (
    <div className="add-row-form">
      <TextField
        name="thingstodo"
        value={values.thingstodo}
        onChange={(e) => updateValues(e)}
        label="Things to do "
        variant="outlined"
      />
      <TextField
        name="owner"
        onChange={(e) => updateValues(e)}
        value={values.owner}
        label="Owner"
        variant="outlined"
      />
      <TextField
        name="status"
        select
        onChange={(e) => updateValues(e)}
        value={values.status}
        label="Status"
        variant="outlined"
        style={{ width: "8em" }}
      >
        {status.map((option) => (
          <MenuItem key={option.color} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="dueDate"
        onChange={(e) => updateValues(e)}
        value={values.dueDate}
        label="Due Date"
        variant="outlined"
      />
      <TextField
        name="priority"
        select
        onChange={(e) => updateValues(e)}
        value={values.priority}
        label="Priority"
        variant="outlined"
        style={{ width: "8em" }}
      >
        {priority.map((option) => (
          <MenuItem key={option.color} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={() => addData(values)}
      >
        Add
      </Button>
    </div>
  );
};

const columnList = [
  {
    icon: <ReorderIcon />,
    name: "Status",
  },
  {
    icon: <TextFieldsIcon />,
    name: "Text",
  },
  {
    icon: <SupervisedUserCircleIcon />,
    name: "People",
  },
  {
    icon: <TodayIcon />,
    name: "Date",
  },
  {
    icon: <ExposureIcon />,
    name: "Numbers",
  },
];

const SelectRow = ({ addColumnData }) => {
  return (
    <CardView>
      <div>
        {columnList.map((item, i) => (
          <div className="card-item" key={i}>
            {item.icon}
            <Button
              className="card-list-name"
              onClick={() => addColumnData(item.name)}
            >
              {item.name}
            </Button>
          </div>
        ))}
      </div>
    </CardView>
  );
};
