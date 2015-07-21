jest.dontMock('../RepositoryList.jsx');

var React = require('react/addons'),
  RepositoryList = require('../RepositoryList.jsx'),
  RepositoryListItem = require('../RepositoryListItem.jsx'),
  TestUtils = React.addons.TestUtils;

describe('RepositoryList', function() {

  var repos = [
    {
      commitsCount: null,
      contributorsCount: null,
      description: null,
      forksCount: 5,
      id: 4,
      lastPushed: null,
      name: "chitchat",
      organizationName: "galanto",
      primaryLanguage: "Go",
      score: null,
      snapshotDate: null,
      starsCount: 2,
      url: null
    },
    {
      commitsCount: null,
      contributorsCount: null,
      description: null,
      forksCount: 5,
      id: 4,
      lastPushed: null,
      name: "chit",
      organizationName: "galanto",
      primaryLanguage: "Java",
      score: null,
      snapshotDate: null,
      starsCount: 2,
      url: null
    }
  ];

  var RepositoryListElement = TestUtils.renderIntoDocument(
    <RepositoryList repositories={repos} filter="all"/>
  );
  var reposR = TestUtils.scryRenderedComponentsWithType(RepositoryListElement, RepositoryListItem);

  it('renders each item as a RepositoryListItem', function() {
    expect(reposR.length).toEqual(2);
  });


});
