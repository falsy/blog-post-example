import React, { useEffect } from 'react';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".style_test__q1MjN {\n  color: red; }\n";
var styles = {"test":"style_test__q1MjN"};
styleInject(css_248z);

const TestApp = () => {
    useEffect(() => {
        console.log('didmount');
    }, []);
    return (React.createElement("p", { className: styles['test'] }, "hello world"));
};

export { TestApp as default };
//# sourceMappingURL=index.js.map
