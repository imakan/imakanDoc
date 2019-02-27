# Forwarding Refs 

```javascript
function logProps(WrappedComponent){
  class LogProps extends React.Component {
    componentDidUpdate(prevProps){
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return LogProps;
}
```