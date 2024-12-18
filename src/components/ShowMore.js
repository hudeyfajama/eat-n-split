import React, { useState } from "react";

const text = [
  {
    id: 1,
    paragraph:
      "I'll explain how to refactor this to reduce prop drilling and state lifting by using more local state management. Here's how we can modify the components: I'll explain how to refactor this to reduce prop drilling and state lifting by using more local state management. Here's how we can modify the components:",
  },
  {
    id: 2,
    paragraph:
      "I'll explain how to refactor this to reduce prop drilling and state lifting by using more local state management. Here's how we can modify the components: I'll explain how to refactor this to reduce prop drilling and state lifting by using more local state management. Here's how we can modify the components:",
  },
  {
    id: 3,
    paragraph:
      "I'll explain how to refactor this to reduce prop drilling and state lifting by using more local state management. Here's how we can modify the components: I'll explain how to refactor this to reduce prop drilling and state lifting by using more local state management. Here's how we can modify the components:",
  },
];

export default function ShowMore() {
  const [expandedIds, setExpandedIds] = useState(new Set());
  const limit = 100;

  function handleShowMore(id) {
    setExpandedIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(id)) {
        newIds.delete(id);
      } else {
        newIds.add(id);
      }
      return newIds;
    });
  }

  return (
    <div className="text-container">
      {text.map((item) => {
        const isExpanded = expandedIds.has(item.id);
        const displayText = isExpanded 
          ? item.paragraph 
          : item.paragraph.slice(0, limit);

        return (
          <div key={item.id} className="text-item">
            <p>
              {displayText}
              {!isExpanded && "..."}
            </p>
            <Button handleShowMore={() => handleShowMore(item.id)}>
              <span>{isExpanded ? "Show less" : "Show more"}</span>
            </Button>
          </div>
        );
      })}
    </div>
  );
}

function Button({ children, handleShowMore }) {
  return <button className="show-more-button" onClick={handleShowMore}>{children}</button>;
}
