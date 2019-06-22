import React from "react";
import {AlertIcon, MessageBoard} from 'PKG/app-ui/src'

export const Section = (props) => {
  const {item: {
      code
    }, children: Children} = props;

  if (!code) {
    return (<div className="p-3">
      <MessageBoard type="warning" messages={[<span>
          There is no local repository for this module.
        </span>
          ]}/>
    </div>);
  }

  return Children
    ? <Children {...props}/>
    : null
};

export const Footer = (props) => {
  const {
    componentid,
    attributes: {
      workspace
    },
    item,
    item: {
      code
    },
    children: Children
  } = props;

  if (!code) {
    return (<div>

    </div>);
  }

  return Children
    ? <Children {...props}/>
    : null
};
