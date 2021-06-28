import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import { useDispatch, useSelector } from "react-redux";
import DashboardIcon from '@material-ui/icons/Dashboard';
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

ListBar.propTypes = {};

function ListBar(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  return (
    <ul className="header__list">
      <li className="header__item tooltipHome">
        <Link to="/home" className="header__item-link">
          <HomeIcon className="header__navbar-icon" color="white" />
        </Link>
        <span class="tooltiptextHome">Trang chủ</span>
      </li>

      <li className="header__item tooltipCourse">
        <NavLink to="/khoa-hoc" className="header__item-link">
          <LocalLibraryIcon
            className="header__navbar-icon"
            fontSize="large"
            color="white"
          />
        </NavLink>
        <span class="tooltiptextCourse">Từ vựng</span>
      </li>
      <li className="header__item tooltipGroup">
        <NavLink to="/topic" className="header__item-link">
          <GroupIcon
            className="header__navbar-icon"
            fontSize="large"
            color="white"
          />
        </NavLink>
        <span class="tooltiptextGroup">Nhóm</span>
      </li>
      <li className="header__item tooltipMatch">
        <NavLink to="/tro-giup" className="header__item-link">
          <SupervisedUserCircleIcon
            className="header__navbar-icon"
            fontSize="large"
            color="white"
          />
        </NavLink>
        <span class="tooltiptextMatch">Tìm người trợ giúp</span>
      </li>
      {
        loggedInUser.role =="admin"? (
          <li className="header__item tooltipEvent">
        <NavLink to="/dashboard" className="header__item-link">
          <DashboardIcon
            className="header__navbar-icon"
            fontSize="large"
            color="white"
          />
        </NavLink>
        <span class="tooltiptextEvent">Quản lý tài khoản</span>
      </li>
        ): ""
      }
    </ul>
  );
}

export default ListBar;
