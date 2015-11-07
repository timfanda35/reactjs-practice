var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    this.loadPage(this.props.source);
  },

  handlePage: function(newUsername, evt){
    var url = "https://api.github.com/users/" + newUsername + "/gists";
    this.loadPage(url);
  },

  loadPage: function(url) {
    $.get(url, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
        <br />
        <Button onButtonClicked={this.handlePage.bind(null, "timfanda35")} />
      </div>
    );
  }
});

