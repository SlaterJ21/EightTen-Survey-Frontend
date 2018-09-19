export const NAVIGATE = 'NAVIGATE'
export const CHANGE_CTS_VIEW = 'CHANGE_CTS_VIEW'
export const LOAD_CLIENTS = 'LOAD_CLIENTS'
export const LOAD_TRAITS = 'LOAD_TRAITS'
export const LOAD_SURVEYS = 'LOAD_SURVEYS'
export const LOAD_CLIENT = 'LOAD_CLIENT'
export const LOAD_TRAIT = 'LOAD_TRAIT'
export const LOAD_SURVEY = 'LOAD_SURVEY'
export const BACK = 'BACK'
export const BUTTONS = 'BUTTONS'
export const QUESTION_DATA = 'QUESTION_DATA'
export const ADD_QUESTION = 'ADD_QUESTION'
export const EDIT_RESPONSE = 'EDIT_RESPONSE'
export const UPDATE_CREDENTIALS = 'UPDATE_CREDENTIALS'
export const LOGIN = 'LOGIN'
export const ADD_OPTION = 'ADD_OPTION'
export const NEW_USER = 'NEW_USER'
export const RETRIEVE_QUESTIONS_BY_CLIENT_ID = 'RETRIEVE_QUESTIONS_BY_CLIENT_ID'
export const INITIALIZE_QUESTIONS = 'INITIALIZE_QUESTIONS'
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER'
export const LOAD_RESULTS = 'LOAD_RESULTS'


const API = 'http://localhost:3000/'

export const submitAnswer = (postObj) => {
  return async dispatch => {
    fetch(`${API}client_response`, {
      method: 'POST',
      body: JSON.stringify(postObj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    dispatch ({type: SUBMIT_ANSWER})
  }
}

export const addOption = (optionObj) => {
  return {
    type: ADD_OPTION,
    payload: optionObj
  }
}

export const editTraitResponse = (response, id) => {
  let obj = {
    trait_id: id,
    response
  }
  return async dispatch => {
    await fetch(`${API}traits/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  }
}

export const addQuestion = (question) => {
  if(question.id){
    let obj = {
      question: question.question,
      type: question.type
    }
    return async dispatch => {
      await fetch(`${API}questions/${question.id}`, {
        method: 'PATCH',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    }
  } else {      /// new question post **MVP**
    return async dispatch => {
      const response = await fetch(`${API}questions`, {
        method: 'POST',
        body: JSON.stringify(question),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      const questionData = await response.json()
      if (question.type === 'mc' || question.type === 'nested') {
        let optionsObj = {
          [questionData[0].id]: question.optionsArray
        }
        console.log(optionsObj);
        fetch(`${API}multiple_choice`, {
          method: 'POST',
          body: JSON.stringify(optionsObj),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
      }
      // back(dispatch)
      dispatch ({
        type: ADD_QUESTION,
        payload: questionData
      })
    }
  }
}

export const questionDataDispatch = (key, value) => {
    return dispatch => {
      questionData(key, value, dispatch)
    }
}

export const questionData = (key, value, dispatch) => {
  if(key === 'response'){
    dispatch({
      type: EDIT_RESPONSE,
      payload: value
    })
  } else {
    dispatch({
      type: QUESTION_DATA,
      payload: {key: key, value: value}
    })
  }
}

export const updateCredentials = (key, value) => {
  return {
    type: UPDATE_CREDENTIALS,
    payload: {
      key: key,
      value: value
    }
  }
}

export const back = () => {
  return {
    type: BACK
  }
}

export const changeCTSView = view => {
  let data = ''
  let buttons
  if (view === 'Clients'){
    data = 'company_name'
    buttons = {
      button1: 'Traits',
      icon1: 'view_list',
      button2: 'Surveys',
      icon2: 'timeline'
    }
  } else if (view === 'Traits'){
    data = 'trait'
    buttons = {
      button1: 'Clients',
      icon1: 'supervisor_account',
      button2: 'Surveys',
      icon2: 'timeline'    }
  } else if (view === 'Surveys'){
    data = 'name'
    buttons = {
      button1: 'Clients',
      icon1: 'supervisor_account',
      button2: 'Traits',
      icon2: 'view_list'    }
  }
  return {
    type: CHANGE_CTS_VIEW,
    payload: {view: view, data: data, buttons: buttons}
  }
}

export const loadClients = () => {
  return async dispatch => {
    const response = await fetch(`${API}users`)
    const clients = await response.json()
    let clients1 = clients.filter(client => !client.is_admin)
    dispatch({
      type: LOAD_CLIENTS,
      payload: clients1
    })
  }
}

export const loadClient = (id) => {
  return async dispatch => {
    const response = await fetch(`${API}users/${id}/responses`)
    const client = await response.json()
    const employeeImpactQuestions = client.filter(client => client.trait_id === 1)
    const communityImpactQuestions = client.filter(client => client.trait_id === 2)
    const talentLifeCycleQuestions = client.filter(client => client.trait_id === 3)
    dispatch({
      type: LOAD_CLIENT,
      payload: {
        client: client,
        employee_impact: employeeImpactQuestions,
        community_impact: communityImpactQuestions,
        talent_lifecycle: talentLifeCycleQuestions
      }
    })
  }
}

export const loadResults = (id) => {
  return async dispatch => {
    const response = await fetch(`${API}users/${id}/results`)
    const client = await response.json()
    const employeeImpactQuestions = client.filter(client => client.trait_id === 1)
    const communityImpactQuestions = client.filter(client => client.trait_id === 2)
    const talentLifeCycleQuestions = client.filter(client => client.trait_id === 3)
    dispatch({
      type: LOAD_CLIENT,
      payload: {
        client: client,
        employee_impact: employeeImpactQuestions,
        community_impact: communityImpactQuestions,
        talent_lifecycle: talentLifeCycleQuestions
      }
    })
  }
}

export const loadTrait = () => {
  return async dispatch => {
    const response1 = await fetch(`${API}traits/1`)
    const trait1 = await response1.json()
    const response2 = await fetch(`${API}traits/2`)
    const trait2 = await response2.json()
    const response3 = await fetch(`${API}traits/3`)
    const trait3 = await response3.json()
    dispatch({
      type: LOAD_TRAIT,
      payload: {trait1_responses: trait1, trait2_responses: trait2, trait3_responses: trait3}
    })
  }
}

export const loadSurvey = (id) => {
  return async dispatch => {
    const response = await fetch(`${API}survey/${id}`)
    const survey = await response.json()
    dispatch({
      type: LOAD_SURVEY,
      payload: survey
    })
  }
}

export const loadSurveys = () => {
  return async dispatch => {
    const response = await fetch(`${API}survey`)
    const surveys = await response.json()
    dispatch({
      type: LOAD_SURVEYS,
      payload: surveys
    })
  }
}

export const navigateDispatch = (destination, item = null, questionObj = null, trait_id = null) => {
  return dispatch => {
    navigate(dispatch, destination, item, questionObj, trait_id)
  }
}

export const navigate = (dispatch, destination, item = null, questionObj = null, trait_id = null) => {
  let data = ''
  if (destination === 'Clients'){
    data = 'trait'
  } else if (destination === 'Traits'){
    data = 'trait'
  } else if (destination === 'Surveys'){
    data = 'question'
  } else if (destination === 'CompanyTraitView'){
    trait_id = item.id
    data = 'question'
  } else if (destination === 'SpecificQuestionView'){
    questionData('question', item.question, dispatch)
    questionData('type', item.type, dispatch)
    questionData('id', item.question_id, dispatch)
  } else {
    data = 'company_name'
  }
  dispatch({
    type: NAVIGATE,
    payload: {destination: destination, item: item, dataText: data, questionObj: questionObj, trait_id: trait_id}
  })
}

export const login = (email, password) => {
  const user = {
    email: email,
    password: password
  }
  return async dispatch => {
    const response = await fetch(`${API}login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const userData = await response.json()
    dispatch({
      type: LOGIN,
      payload: userData
    })
  }
}

export const newUser = (email, password, first_name, last_name, phone, company_name) => {
  const user = { email, password, first_name, last_name, phone, company_name }
  return async dispatch => {
    const response = await fetch(`${API}users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const userData = await response.json()
    navigate(dispatch, 'SurveyQuestionView')
    dispatch({
      type: NEW_USER,
      payload: userData
    })
  }
}

export const retrieveQuestionsByClientId = (client_id) => {
  return async dispatch => {
    const response = await fetch(`${API}questions/client_id/${client_id}`)
    const questions = await response.json()
    dispatch({
      type: RETRIEVE_QUESTIONS_BY_CLIENT_ID,
      payload: questions
    })
  }
}
//////////////////////////////////////////returns random survey///////////////
const randomQuestions = (arr) => {
  let result = []
  let choices = [...arr]
  while (result.length < 3) {
   let index = Math.floor(Math.random() * choices.length)
   result.push(choices[index])
   choices.splice(index, 1)
  }
  return result
}

const randomize = (arr) => {
  let result = []
  let choices = [...arr]
  while (choices.length > 0) {
   let index = Math.floor(Math.random() * choices.length)
   result.push(choices[index])
   choices.splice(index, 1)
  }
 return result
}

const joinChoices = (arr, choices) => {
 for (let i = 0; i < arr.length; i++){
   if (arr[i].type === 'mc' || arr[i].type === 'nested'){
     arr[i].choices = []
     for (let j = 0; j < choices.length; j++){
       if (choices[j].question_id === arr[i].id){
         arr[i].choices.push(choices[j])
       }
     }
   }
 }
 return arr
}

const sortQuestions = (questions, choices) => {
  let sortedQuestions = {
    1: [],
    2: [],
    3: []
  }
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].trait_id === 1) {
      sortedQuestions[1].push(questions[i])
    }
    if (questions[i].trait_id === 2) {
      sortedQuestions[2].push(questions[i])
    }
    if (questions[i].trait_id === 3) {
      sortedQuestions[3].push(questions[i])
    }
  }
  let result = []
  for (let i = 1 ; i <= 3; i ++ ) {
    result.push(...randomQuestions(sortedQuestions[i]))
  }
  result = randomize(result)
  result = joinChoices(result, choices)
  return result
}
///////////////////////////////////////////////////////////

export const initializeQuestions = () => {
 return async dispatch => {
   const questionCall = await fetch(`${API}questions`)
   const questions = await questionCall.json()
   const multipleChoiceCall = await fetch(`${API}multiple_choice`)
   const choices = await multipleChoiceCall.json()
   let randomizedQuestions = sortQuestions(questions, choices)
   dispatch({
     type: INITIALIZE_QUESTIONS,
     payload: { newSurveyQuestions: randomizedQuestions}
   })
 }
}
