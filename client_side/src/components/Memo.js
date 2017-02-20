import React, { Component, PropTypes } from 'react';
import { reduxForm, Fields } from 'redux-form';
import { Link } from 'react-router';

class Memo extends Component {
  onSubmit(props) {
    console.log(props);
    alert('Post Submitted');
  }

  render() {
    const { handleSubmit, fields: { title, categories, content }} = this.props;
    return (
      <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
        <h3>Create A New Memo</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>
        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <input type="text" className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};
  if(!values.title) {
    errors.title = 'Enter title';
  }
  if(!values.categories) {
    errors.categories = 'Enter category';
  }
  if(!values.content) {
    errors.content = 'Enter content';
  }

  return errors;
}

export default reduxForm({
  form: 'Memo',
  fields: ['title', 'categories', 'content'],
  validate
})(Memo);