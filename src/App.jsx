import React, { Component } from 'react';
import Statistics from './components/Statistics';
import FeedbackOptions from './components/FeedbackOptions';
import Section from './components/Section';
import Notification from './components/Notification';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleFeedback = (option) => {
    this.setState((prevState) => ({
      [option]: prevState[option] + 1,
    }));
  };

  countTotalFeedback() {
    return this.state.good + this.state.neutral + this.state.bad;
  }

  countPositiveFeedbackPercentage() {
    const total = this.countTotalFeedback();
    return total > 0 ? (this.state.good / total) * 100 : 0;
  }

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
<div className="container">
  <h1>Кафе Expresso</h1>
  <Section title="Залиште свій відгук">
    <FeedbackOptions
      options={['good', 'neutral', 'bad']}
      onLeaveFeedback={this.handleFeedback}
    />
  </Section>
  <Section title="Статистика">
    {total > 0 ? (
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        positivePercentage={positivePercentage.toFixed(2)}
      />
    ) : (
      <Notification message="There is no feedback" />
    )}
  </Section>
</div>

    );
  }
}

export default App;
