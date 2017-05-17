import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createDocument } from '../../actions/DocumentActions';

class AddDocumentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      access: '',
      content: ''
    };

    this.onClickSave = this.onClickSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    $(ReactDOM.findDOMNode(this.refs.access)).on('change', this.onChange);
    $('select').material_select();
    $('.modal').modal();
  }

  onChange(e) {
    this.setState({
      [ e.target.name ] : e.target.value
    });
  }

  onClickSave() {
    this.props.createDocument(this.state);
  }
  

  render() {
    return (
      <div id="addDocumentModal" className="modal">
        <div className="modal-content">
          <div className="center-align">
            <h5 className="blue-color">Add New Document</h5>
            <h6 className="pink-color">
              * Note that all fields are required *
            </h6>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="row modal-form-row">
                <div className="input-field col s12">
                  <input
                    name="title"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.title}
                    className="validate" />
                  <label htmlFor="title">Title</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <select
                    ref="access"
                    name="access"
                    value={this.state.access}
                    onChange={this.onChange}>
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                    <option value="Role">Role</option>
                  </select>
                  <label htmlFor="access">Access Type</label>
                </div>
              </div>
              <div className="input-field col s12">
                <textarea
                  name="content"
                  className="materialize-textarea"
                  onChange={this.onChange}
                  value={this.state.content} />
                <label htmlFor="content">Content</label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
          className="modal-close btn-large right waves-effect blue-bg"
            name="action"
            onClick={this.onClickSave} >Add Document</button>
          <button
          className="modal-close left btn-large waves-effect deep-red-bg-color"
            name="action">Cancel</button>
        </div>
      </div>
    );
  }
}

AddDocumentModal.contextTypes = {
  router: PropTypes.object.isRequired
};

AddDocumentModal.propTypes = {
  createDocument: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    creating: document.creating,
    documents: state.documents
  };
}

export default connect(mapStateToProps, { createDocument })(AddDocumentModal);