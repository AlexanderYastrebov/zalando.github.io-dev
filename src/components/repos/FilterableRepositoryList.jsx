import React from 'react';
import _ from 'lodash';
import FilterBar from './FilterBar.jsx';
import RepositoryList from './RepositoryList.jsx';
import RepoStore from '../../stores/RepoStore.js';
import SectionHeading from '../section-heading/SectionHeading.jsx';
import api from '../../utils/api';

class FilterableRepositoryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      repositories: RepoStore.getRepos()
    };
    this.handleUserInput = this.handleUserInput.bind(this);

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    RepoStore.addChangeListener(this.onChange);
    api.getRepos();
  }

  onChange() {
    this.setState({
      repositories: RepoStore.getRepos()
    });
  }

  handleUserInput(filter) {
    let newRepoList;
    if (filter === 'all') {
      newRepoList = RepoStore.getRepos();
    } else {
      newRepoList = _.filter(RepoStore.getRepos(), {'primaryLanguage': filter});
    }
    this.setState({
      filter: filter,
      repositories: newRepoList
    });
  }

  render() {
    return (
      <div className='container repos'>
          <SectionHeading text="Repositories" />
          <FilterBar
            filter={this.state.filter}
            onUserInput={this.handleUserInput}
            />
          <RepositoryList
            repositories={this.state.repositories}
            filter={this.state.filter}
            />
      </div>
    );
  }
}

export default FilterableRepositoryList;
