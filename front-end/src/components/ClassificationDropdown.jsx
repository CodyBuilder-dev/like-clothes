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

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]

export default class ClassificationDropdown extends PureComponent {
  render() {
    const { type, setSearchState } = this.props;
    console.log(type);
    const optionHandle = () => {
      switch (type) {
        case '대분류':
          return {
            type: type, 
            optionList: classifyOptions.majors,
          };
        case '중분류':
          return {
            type: type,
            optionList: classifyOptions.middles,
          };
        case '소분류':
          return {
            type: type,
            optionList: classifyOptions.minors,
          };
        default:
          return {
            type: type, 
            optionList: [{ key: 0, text: '오류', value: '오류' }],
          };
      }
    }

    const onPressed = () => {
      const { type, optionList } = optionHandle();
      setSearchState(type, optionList);
    }

    return (
    // <button onClick={onPressed}>{type}</button>
      <Dropdown placeholder={type} fluid={false} basic multiple selection options={options} />
    );
  };
};