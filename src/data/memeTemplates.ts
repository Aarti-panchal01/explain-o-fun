
export interface MemeTemplate {
  topText: string;
  bottomText: string;
  image: string;
  category: 'explanation' | 'confusion' | 'education' | 'ai' | 'professor';
}

const memeTemplates: MemeTemplate[] = [
  {
    topText: `WHEN SOMEONE ASKS ABOUT {topic}`,
    bottomText: "ME: *EXPLAINS WITH ADVANCED SCIENCE*",
    image: "/lovable-uploads/98765221-8abb-4cba-af59-9d5966ad2101.png",
    category: "explanation"
  },
  {
    topText: `{topic}? OH YOU MEAN`,
    bottomText: "THAT THING NOBODY UNDERSTANDS",
    image: "/lovable-uploads/d44eb7af-27a5-45b3-821f-9667db43e929.png",
    category: "confusion"
  },
  {
    topText: `TRYING TO UNDERSTAND {topic}`,
    bottomText: "MY BRAIN: UNDERSTANDABLE, HAVE A NICE DAY",
    image: "/lovable-uploads/98765221-8abb-4cba-af59-9d5966ad2101.png",
    category: "confusion"
  },
  {
    topText: `TEACHER: EXPLAIN {topic}`,
    bottomText: "ME: *PANICS IN CONFUSION*",
    image: "/lovable-uploads/d44eb7af-27a5-45b3-821f-9667db43e929.png",
    category: "education"
  },
  {
    topText: `NOBODY: ABSOLUTELY NOBODY:`,
    bottomText: `ME: LET ME TELL YOU ABOUT {topic}`,
    image: "/lovable-uploads/98765221-8abb-4cba-af59-9d5966ad2101.png",
    category: "explanation"
  },
  {
    topText: `THEY SAID {topic} WAS SIMPLE`,
    bottomText: "THEY LIED",
    image: "/lovable-uploads/93923333-0797-4f95-b898-b9e8583476fb.png",
    category: "confusion"
  },
  {
    topText: `WHAT IS AI?? OH YOU MEAN`,
    bottomText: "THAT THING NOBODY UNDERSTANDS",
    image: "/lovable-uploads/6628eab6-74f2-479d-b393-b54266c3c6cd.png",
    category: "ai"
  },
  {
    topText: `EXPLAINING WHAT IS {topic}?`,
    bottomText: `LIKE A DISTINGUISHED PROFESSOR`,
    image: "/lovable-uploads/c08b02c6-65f6-4d2c-ab9a-ef1037575f93.png",
    category: "professor"
  },
  {
    topText: `EXPLAINING WHAT IS {topic}`,
    bottomText: `LIKE A DISTINGUISHED PROFESSOR`,
    image: "/lovable-uploads/2c12f6fb-c779-4518-86b8-ef2fda72f6d5.png",
    category: "professor"
  }
];

// Function to find a template that matches the content
export const findMatchingTemplate = (topText: string, bottomText: string): MemeTemplate => {
  // First try to find an exact match
  let matchedTemplate = memeTemplates.find(template => 
    template.topText.replace('{topic}', '').trim() === topText.replace(/\{topic\}|\w+/g, '').trim() && 
    template.bottomText.replace('{topic}', '').trim() === bottomText.replace(/\{topic\}|\w+/g, '').trim()
  );
  
  // If no exact match, check for templates with matching keywords
  if (!matchedTemplate) {
    // Check for distinguished professor templates
    if (bottomText.includes("DISTINGUISHED PROFESSOR")) {
      matchedTemplate = memeTemplates.find(template => 
        template.category === "professor"
      );
    }
    // Check for AI-specific templates
    else if (topText.includes("AI") || bottomText.includes("AI")) {
      matchedTemplate = memeTemplates.find(template => 
        template.category === "ai"
      );
    }
    // Check for confusion-related templates
    else if (topText.includes("UNDERSTAND") || bottomText.includes("CONFUSED")) {
      matchedTemplate = memeTemplates.find(template => 
        template.category === "confusion"
      );
    }
    // Check for explanation-related templates
    else if (topText.includes("EXPLAIN") || bottomText.includes("EXPLAIN")) {
      matchedTemplate = memeTemplates.find(template => 
        template.category === "explanation"
      );
    }
  }
  
  // If still no match, use the first template as fallback
  return matchedTemplate || memeTemplates[0];
};

// Function to get a random meme template
export const getRandomTemplate = (currentTopText: string, currentBottomText: string, topic: string): MemeTemplate => {
  // Get a random meme template different from current one
  let templates = [...memeTemplates];
  
  // Filter out the current template if it matches
  templates = templates.filter(template => 
    !(template.topText.replace('{topic}', topic.toUpperCase()) === currentTopText && 
      template.bottomText.replace('{topic}', topic.toUpperCase()) === currentBottomText)
  );
  
  // If we've filtered out all templates, use the original array
  if (templates.length === 0) {
    templates = [...memeTemplates];
  }
  
  // Return a random template from the filtered list
  return templates[Math.floor(Math.random() * templates.length)];
};

// Process the template by replacing {topic} placeholders with the actual topic
export const processTemplate = (template: MemeTemplate, topic: string): { topText: string, bottomText: string } => {
  return {
    topText: template.topText.replace('{topic}', topic.toUpperCase()),
    bottomText: template.bottomText.replace('{topic}', topic.toUpperCase())
  };
};

export default memeTemplates;
