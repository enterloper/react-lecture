import React, { Component } from 'react';
import { connect } from 'react-redux';
//we export a function we'll get back another component with the "CLASS" of Authenitciatoin
export default function(ComposedComponent) {
  class Authentication extends Component {
    //this static keyword is defining a property or object on the class, NOT an instance, but the actual class.
    static contextTypes = {
      router: React.PropTypes.object
    }

    /*Because context is so easy to abuse (my MOST top level component is going to provide all of my data for the entire application via context),
     react makes you define a property called 'contextTypes' on each component.
     */

    //THIRD STEP vvvv
    componentWillMount() {
      //this will be a THIRD proof of concept for using the router via this.context
      // this.context.router.push('/');
      if(!this.props.authenticated) {
        this.context.router.push('/');
      }
    }
    //cWillUpdate is called whenever a component is handed a new set of props, or be rendered nad the first argument to this is nextProps
    //once the user is on the resources page componentwillMount will have already ran, and so we need to make sure that we call it again whenever the component is about to be updated.
    componentWillUpdate(nextProps){
      if(!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      console.log(this.context);
      // This will be a FIRST proof of concept that shows us it's working.
      //console.log('Rendering', ComposedComponent);
      //spread operator to ensure all props are properly passed.

      //this will be a SECOND proof of concept that shows we are getting the authenticated prop
      // console.log(this.props.authenticated);

      return <ComposedComponent {...this.props}/>
    }
  }
  function mapStateToProps(state) {
    return { authenticated: state.authenticated };
  }
  return connect(mapStateToProps)(Authentication);
}

//the difference between wrapping inside of a component, and wrapping on say router on the index.js file,
// is whether or not you expect every instance of the component in question being used in your application to require your higher order component.
// so consideration should be used when using higher order components.

/*steps:
 1: Question: how do tell if a user is logged in or not?
 Answer: connect our Authentication class to our Redux store,
 if they're Authenticated then great we can have them see the protect resources.
 2:
 */
