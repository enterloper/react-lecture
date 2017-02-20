import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import _ from 'lodash';

class Memo extends Component {
  onSubmit(props) {
    console.log(props);
    alert('Post Submitted');
  }

  render() {
    const { handleSubmit, fields: { title, categories, content }} = this.props;

    return (
      <form onSubmit={handleSubmit(props => this.onSubmit(props))} >
        <h3>Create A New Memo</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`} >
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`} >
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>
        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`} >
          <label>Title</label>
          <input type="text" className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>        <button type="submit" className="btn btn-primary">Submit</button>
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
    errors.categories = 'Enter categories';
  }
  if(!values.content) {
    errors.content = 'Enter content';
  }
  return errors;
}

export default reduxForm({
  form: 'Memo',
  fields: ['title', 'categories', 'content'], /*Object.keys(FIELDS),*/
  validate
})(Memo)

// import React, { Component, PropTypes } from 'react';
// import { reduxForm } from 'redux-form';
// import { Link } from 'react-router';
// // import { everySingle, transform } from '../utils/methods';
// import _ from 'lodash';
// const FIELDS = {
//   title: {
//     type: 'input',
//     label: 'Title for Memo',
//     id: 0,
//   },
//   categories: {
//     type: 'input',
//     label: 'Enter some categories for this memo',
//     id: 1,
//   },
//   content: {
//     type: 'textarea',
//     label: 'Memo Contents',
//     id: 2,
//   }
// };
//
// class Memo extends Component {
//   onSubmit(props) {
//     console.log(props);
//     alert('Post Submitted');
//   }
//
//   renderField(fieldConfig, field) {
//     const fieldHelper = this.props.fields[field]; //off of Redux Form
//
//     return (
//       <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`} key={fieldConfig.id}>
//         <label>{fieldConfig.label}</label>
//         <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
//         <div className="text-help">
//           {fieldHelper.touched ? fieldHelper.error : ''}
//         </div>
//       </div>
//     )
//   }
//
//   render() {
//     // const { handleSubmit, fields: { title, categories, content }} = this.props;
//     const { handleSubmit } = this.props;
//
//     return (
//       <form onSubmit={handleSubmit(props => this.onSubmit(props))} >
//         <h3>Create A New Memo</h3>
//         {_.map(FIELDS, this.renderField.bind(this))}
//         <button type="submit" className="btn btn-primary">Submit</button>
//         <Link to="/" className="btn btn-danger">Cancel</Link>
//       </form>
//     )
//   }
// }
// function validate(values) {
//   const errors = {};
//   // if(!values.title) {
//   //   errors.title = 'Enter title';
//   // }
//   // if(!values.categories) {
//   //   errors.categories = 'Enter categories';
//   // }
//   // if(!values.content) {
//   //   errors.content = 'Enter content';
//   // }
//   _.forEach(FIELDS, (type, field) => {
//     if(!values[field]) {
//       errors[field] = `Enter a ${field}`
//     }
//   })
//   return errors;
// }
//
// export default reduxForm({
//   form: 'Memo',
//   fields: /*['title', 'categories', 'content']*/ Object.keys(FIELDS),
//   validate
// })(Memo)