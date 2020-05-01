import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Input, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';


const names = {
  majors: ['남', '아동', '여'],
  middles: ['바지', '상의', '스커트', '스포츠/용품', '아우터', '원피스'],
  minors: [],
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    // marginBottom: theme.spacing(3),
    // marginRight: 20,
    // margin: theme.spacing(1),
    // minWidth: 120,
    // maxWidth: 120,
    marginTop: 5
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  inputLabel: {

  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const { type, setSearchFilter } = props;

  const handleTypeToList = () => {
    switch (type) {
      case '대분류':
        return names.majors;
      case '중분류':
        return names.middles;
      case '소분류':
        return names.minors;
      default:
        return [];
    }
  };

  const decodeTypeKorToEng = (type) => {
    switch (type) {
      case '대분류':
        return 'majors';
      case '중분류':
        return 'middles';
      case '소분류':
        return 'minors';
      default:
        return '';
    }
  }

  const handleChange = (event) => (
    new Promise((resolve, reject) => {
      if (event.target.value) {
        setPersonName(event.target.value);
        resolve(event.target.value);
      }
      else reject('error : event.target.value');
    })
  ).then((res) => {
    setSearchFilter({ type: decodeTypeKorToEng(type), filterList: res }); // 이름을 추가
  }).catch((err) => { alert(err) });

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">{type}</InputLabel>
      <Select style={{ width: '150px', height: '43px', backgroundColor: 'white', borderRadius: '5px', border: 'solid 2px black', margin: '5px 0 0 0', paddingLeft: 10}}
        labelId="demo-mutiple-name-label"
        id={type}
        multiple
        value={personName}
        onChange={handleChange}
        input={<Input />}
        MenuProps={MenuProps}
        variant='outlined'
        name={type}
      >
        {handleTypeToList().map((name) => (
          <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
