import React from "react";
import {PropTypes} from "react";

/**
 *  Wrapper component for chatbro iframe
 *
 */
class ChatBro extends React.Component {

    render() {

    	let frameHeight =  this.props.height || "30%";

        if (!this.props.chatId) return null;
        return <iframe 
	        		style={{height: frameHeight,  width: "100%"}} 
	        		src={`https://www.chatbro.com/ru/${this.props.chatId}`}
	        		sandbox="allow-same-origin allow-forms allow-scripts"
        		>
        		</iframe>;
    }
}

ChatBro.propTypes = {
    chatId: PropTypes.string.isRequired,
    height: PropTypes.string
};

export default ChatBro;