import React from "react";
import {AlertIcon, MessageBoard} from '@nebulario/tracker-app-ui'

export const Section = (props) => {
  const {item: {
      repository
    }, children: Children} = props;

  if (!repository) {
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
      repository
    },
    children: Children
  } = props;

  if (!repository) {
    return (<div>

    </div>);
  }

  return Children
    ? <Children {...props}/>
    : null
};
