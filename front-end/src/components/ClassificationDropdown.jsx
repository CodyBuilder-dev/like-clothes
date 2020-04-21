import React, { PureComponent } from 'react'
import { Dropdown } from 'semantic-ui-react'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const classifyOptions = {
  majors: [
    { key: 0, text: '남', value: '남' },
    { key: 1, text: '아동', value: '아동' },
    { key: 2, text: '여', value: '여' },
  ],
  middles: [
    { key: 0, text: 'ㄴㅇㅁㄹ', value: '남' },
    { key: 1, text: '아동', value: '아동' },
    { key: 2, text: '여', value: '여' },
  ],
  minors: [],
};

export default class ClassificationDropdown extends PureComponent {
  render() {
    const { type, onTest } = this.props;
    console.log(type);
    const optionHandle = () => {
      switch (type) {
        case '대분류':
          return classifyOptions.majors;
        case '중분류':
          return classifyOptions.middles;
        case '소분류':
          return classifyOptions.minors;
        default:
          return [{ key: 0, text: '오류', value: '오류' }];
      }
    }

    const onPressed = (e) => {
      onTest(e.target.value);
      console.log('target.value:', e);
    }

    return (
      <Dropdown placeholder={type} fluid multiple selection options={optionHandle()} onClick={(e) => onPressed(e)} />
    );
  };
};