import * as _ from "lodash";
import { CreatId } from "./CreateId";
interface MsgSubscripted{
  id: string;
  name: string;
  handlers: ((data?: Array<any>) => void)[];
}
export class Message {
  msgSubscriptedList: MsgSubscripted[] = [];
  constructor() {}
  /**
   * 订阅msgName的消息，
   * 当有msgName的消息发布，就立即执行Handler
   * 
   * @param {string} msgName 
   * @param {(data?: Array<any>) => void} handler 
   * @memberof Message
   */
  subscript(msgName: string, handler: (data?: Array<any>) => void){
    const msgIndex = _.findIndex(this.msgSubscriptedList, msgSubscripted => msgSubscripted.name == msgName);
    let msgSubscripted: MsgSubscripted;
    if(msgIndex >= 0){
      msgSubscripted = this.msgSubscriptedList[msgIndex];
      msgSubscripted.handlers.push(handler);
    }else{
      msgSubscripted = {
        id: CreatId(),
        name: msgName,
        handlers: [handler]
      }
      this.msgSubscriptedList.push(msgSubscripted);
    }
  }
  /**
   * 发布msgName消息，
   * 当有订阅msgName的消息，就立即执行msgName消息的订阅函数
   * 
   * @param {string} msgName 
   * @param {Array<any>} [msgData] 
   * @memberof Message
   */
  distribute(msgName: string, msgData?: Array<any>){
    const msgIndex = _.findIndex(this.msgSubscriptedList, msgSubscripted => msgSubscripted.name == msgName);
    if(msgIndex >= 0){
      const msgSubscripted = this.msgSubscriptedList[msgIndex];
      _.forEach(msgSubscripted.handlers, msgHandler => msgHandler(msgData));
    }
  }
  /**
   * todo
   * 发布msgName消息
   * 可给已经订阅的发布消息， 参考distribute
   * 同时也可以给未来订阅msgName消息发布这个消息
   * 
   * @param {string} msgName 
   * @param {Array<any>} [msgData] 
   * @memberof Message
   */
  distributePassFuture(msgName: string, msgData?: Array<any>){

  }
}

