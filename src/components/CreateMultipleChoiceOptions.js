import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Collection, CollectionItem, Row, Button, Input } from 'react-materialize'
import { addOption } from '../actions'

class CreateMultipleChoiceOptions extends Component {

  render() {
    const { addOption, questionObj } = this.props
    let optionObj = {}
    return (
      <Row>
        <Collection className="container center-align">
            { questionObj.optionsArray.map(item => {
              return <CollectionItem key={item.answer}>{`${item.answer} ${item.value}`}</CollectionItem>
              })
            }
        </Collection>
        <Input
          s={12}
          placeholder="Enter option for multiple choice question"
          label="Answer"
          type="text"
          name="answer"
          onChange={(e)=> optionObj[e.target.name] = e.target.value}
        />
        <Input
          s={12}
          placeholder="5"
          label="Value"
          type="text"
          name="value"
          onChange={(e)=> optionObj[e.target.name] = Number(e.target.value)}
        />
        <Button className="eightten_button" type='submit' value='Submit' onClick={()=> addOption(optionObj)}>add multiple choice option</Button>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addOption
}, dispatch)

const mapStateToProps = state => {
  return {
    questionObj: state.mainReducer.questionObj
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMultipleChoiceOptions);
