import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactNode } from 'react';
import { NavLink } from 'react-router';

type TabItem = {
  value: string;
  label: string;
  to: string;
  icon?: ReactNode;
};

type TabsBasicType = {
  value: string;
  tabs: TabItem[];
  className?: string;
  onValueChange?: (value: string) => void;
};

export function TabsBasic({
  value,
  tabs,
  className,
  onValueChange,
}: TabsBasicType): React.ReactElement {
  return (
    <Tabs value={value} className={className} onValueChange={onValueChange}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} asChild>
            <NavLink to={tab.to} end={false}>
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </NavLink>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
