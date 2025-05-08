import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to='/houses'>Houses</NavLink>
        </li>
        <li>
          <NavLink to='/residents'>Residents</NavLink>
        </li>
        {/* … */}
      </ul>
    </nav>
  );
}
