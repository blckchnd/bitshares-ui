import React from "react";
import PropTypes from "prop-types";
import { Input, Icon } from "bitshares-ui-style-guide";

export default function SearchInput({ onChange, value, placeholder, maxLength,
    style, className, name, autoComplete, onClear, ...other }) {

    return <Input
        autoComplete={autoComplete}
        style={style}
        type="text"
        className={className}
        placeholder={placeholder}
        maxLength={maxLength}
        name={name}
        value={value}
        onChange={onChange}
        addonAfter={<Icon type="search" />}
        suffix={
            onClear ?
                <Icon
                    onClick={onClear}
                    type="close"
                    className={value ? "cursor-pointe" : "hide"}
                /> :
                null
        }
        {...other}
    />;
}

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    name: PropTypes.string,
    autoComplete: PropTypes.string,
    maxLength: PropTypes.number,
    onClear: PropTypes.func
};

SearchInput.defaultProps = {
    placeholder: "",
    style: {},
    className: "",
    name: "",
    autoComplete: "on",
    maxLength: "",
    onClear: null
};