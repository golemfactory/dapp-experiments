import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './index.css';
import {addMessage, getMessages, updateMessage, deleteMessage} from '../../store/index';

const Index = () => {
  const messages = useSelector(state => state.app.messages)
  const dispatch = useDispatch()

  const addNewTodo = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    dispatch(addMessage(data));
  }

  const updateTodo = async (event, msg) => {
    event.preventDefault();
    dispatch(updateMessage(msg.id));
  }

  const deleteTodo = async (event, msg) => {
    event.preventDefault();
    dispatch(deleteMessage(msg.id));
  }

  useEffect(() => {
    dispatch(getMessages())
  }, []);

  return (
    <div class="mui-container">
      <div class="mui-panel mui--text-center">
        <h1>My ToDo List</h1>
        <h2>Application that allows you to store your tasks, based on a distributed architecture!</h2>
      </div>
      <div class="mui-panel mui--text-center">
        <div class="form-wrapper">
          <form class="mui-form--inline" onSubmit={addNewTodo}>
            <div class="mui-textfield">
              <input type="text" name="text" placeholder="Write something to do..."/>
            </div>
            <div class="mui-textfield">
              <input type="hidden" value="NEW" name="status"/>
            </div>
            <button class="mui-btn mui-btn--primary mui-btn--raised">Add</button>
          </form>
        </div>
        <div class="todo-list">
          {messages.map(message => (
            <div class="todo-item todo-item-{{ msg.status|lower }}">
              <div class="mui-checkbox">
                <label>
                  <input type="checkbox" value="" name="checked" onChange={event => updateTodo(event, message)} checked={message.status === 'DONE'}/>
                </label>
              </div>
              <span class="text">{ message.text }</span>
              <form onSubmit={event => deleteTodo(event, message)}>
                <button class="mui-btn mui-btn--danger mui-btn--raised">Remove</button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;