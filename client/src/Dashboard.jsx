import React from 'react';
import { Icon, Button, Card, CardHeader } from '@ui5/webcomponents-react';
import { useNavigate } from 'react-router-dom';
import "@ui5/webcomponents-icons/dist/sales-order.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/supplier.js";

function Dashboard() {
  const navigate = useNavigate();

  const sections = [
    {
      header: "Application",
      cards: [
        { title: "Sales Register", icon: "sales-order", route: "/sales-register" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pl-20 pr-15 pb-10 space-y-10 pt-20">
      {sections.map((section) => (
        <div key={section.header}>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{section.header}</h2>

          <div className="grid grid-cols-6 gap-10">
            {section.cards.map((card) => (
              <Card
                key={card.title}
                className="w-full h-[230px] cursor-pointer shadow-md transition-all duration-300 rounded-2xl"
                onClick={() => navigate(card.route)}
              >
                <div className="group w-full h-[230px] flex flex-col justify-between p-4 rounded-2xl border border-gray-200 hover:bg-gray-200 hover:border-gray-400">
                  <span className="text-lg font-semibold text-gray-800 group-hover:gray-800">
                    {card.title}
                  </span>
                  
                  <div className="flex justify-start">
                    <Icon
                      name={card.icon}
                      className="text-gray-700 group-hover:gray-800"
                      style={{height: '3rem', width: '3rem' }}
                    />
                  </div>
                </div>
              </Card>

            ))}
          </div>
        </div>
      ))}


    </div>
  );
}

export default Dashboard;
