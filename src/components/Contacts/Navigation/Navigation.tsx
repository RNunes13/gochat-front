
import * as React from 'react';

// Material UI
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HowToRegIcon from '@material-ui/icons/HowToRegRounded';
import AccessTimeIcon from '@material-ui/icons/AccessTimeRounded';

interface IContactNavigationProps {
  activeTab: TabsType;
  disabledPendingTab: boolean;
  setActiveTab(value: TabsType): void;
}

export type TabsType = "accepts" | "pending";

const ContactNavigation: React.FunctionComponent<IContactNavigationProps> = ({
  activeTab,
  setActiveTab,
  disabledPendingTab,
}) => {
  return (
    <BottomNavigation
      value={ activeTab }
      className="gc-contacts__navigation"
      onChange={ (_, value) => setActiveTab(value) }
      showLabels
    >
      <BottomNavigationAction
        label="Aceitos"
        value="accepts"
        icon={ <HowToRegIcon /> }
        className="gc-contacts__navigation--item"
      />
      <BottomNavigationAction
        label="Pendentes"
        value="pending"
        icon={ <AccessTimeIcon /> }
        disabled ={ disabledPendingTab }
        className="gc-contacts__navigation--item"
      />
    </BottomNavigation>
  );
};

export default ContactNavigation;

