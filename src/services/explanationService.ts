
import { Explanation, ExplanationMode, PersonaMode } from "../types/explanation";

// This is a mock service that will be replaced with real API calls later
export const generateExplanation = async (
  topic: string,
  mode: ExplanationMode,
  persona: PersonaMode
): Promise<Explanation> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  let text = '';
  
  // Generate different mock responses based on mode
  switch (mode) {
    case 'eli5':
      text = getEli5Response(topic, persona);
      break;
    case 'eli12':
      text = getEli12Response(topic, persona);
      break;
    case 'eli20':
      text = getEli20Response(topic, persona);
      break;
    case 'shower':
      text = getShowerThoughtResponse(topic, persona);
      break;
    default:
      text = getEli5Response(topic, persona);
  }
  
  return {
    text,
    mode,
    persona,
    topic
  };
};

// Mock responses
function getEli5Response(topic: string, persona: PersonaMode): string {
  const responses: Record<PersonaMode, string> = {
    'professor': `Okay little one, imagine ${topic} is like a big, colorful balloon. When you let go of a balloon, it flies up high in the sky because it's filled with a special, light air that wants to float. That's how ${topic} works in the simplest way!`,
    'geek': `So kiddo, ${topic} is basically like when you have a super cool toy robot that does things automatically. The robot has tiny, tiny parts inside that work together, just like ${topic} has special pieces that make it work!`,
    'genz': `Ok so ${topic} is like suuuper easy! It's like when your favorite game loads really fast and you're like "whoaaa!" That's basically what ${topic} does - it makes cool stuff happen super quick! No cap!`,
    'comedian': `Heyyyy little buddy! Wanna know about ${topic}? It's like when you try to eat spaghetti but it goes EVERYWHERE! Messy and fun and sometimes a little confusing, but that's ${topic} for ya! *makes silly face*`
  };
  
  return responses[persona];
}

function getEli12Response(topic: string, persona: PersonaMode): string {
  const responses: Record<PersonaMode, string> = {
    'professor': `Let's explore ${topic} at a middle-school level. ${topic} is essentially a system that functions by converting one form of energy into another. Think about how a bicycle works - you input energy by pedaling, and the bike converts that into forward motion. ${topic} operates on similar principles of energy transfer.`,
    'geek': `So here's the deal with ${topic}: it's like the code behind your favorite video game. There are specific rules that determine how it works, and when you understand those rules, you can predict what will happen. In technical terms, ${topic} involves a specific sequence of processes that produce reliable results.`,
    'genz': `NGL, ${topic} is actually pretty fire when you get it. It's like when your TikTok algorithm finally understands your vibe and only shows you the good stuff. ${topic} is kinda the same - it figures out patterns and then does its thing. Pretty based, actually!`,
    'comedian': `Middle school, huh? Well, ${topic} is like that awkward school dance where nobody knows where to put their hands. It seems complicated but really everyone's just trying to follow some basic steps without tripping! And just like middle school, ${topic} sometimes makes weird noises when you least expect it!`
  };
  
  return responses[persona];
}

function getEli20Response(topic: string, persona: PersonaMode): string {
  const responses: Record<PersonaMode, string> = {
    'professor': `A comprehensive analysis of ${topic} reveals its multifaceted nature. At its foundation, ${topic} operates according to fundamental principles that can be observed and measured with precision. The mechanisms underlying ${topic} have been studied extensively, revealing complex interactions at multiple scales.\n\nFurthermore, recent advances in our understanding of ${topic} have illuminated previously obscure aspects, leading to new theoretical frameworks that better explain observed phenomena. These developments have significant implications across multiple domains of application.`,
    'geek': `Let's dive deep into ${topic} from a technical perspective. The underlying architecture consists of interconnected systems that process and transmit information according to well-defined protocols. When examining ${topic} at scale, emergent properties become apparent that cannot be predicted from analysis of individual components alone.\n\nThe technical specifications of ${topic} typically include parameters that can be optimized for different use cases. Advanced implementations may incorporate machine learning algorithms to adapt dynamically to changing conditions, significantly enhancing performance metrics compared to static models.`,
    'genz': `Okay, real talk about ${topic}? It's actually way more complex than most people realize. Like, on a fundamental level, it's processing massive amounts of data and making split-second decisions constantly. No cap, the algorithms behind ${topic} are genuinely mind-blowing when you actually understand them.\n\nWhat makes ${topic} particularly interesting is how it intersects with cultural and social dynamics in ways that weren't possible before. The meta-analysis of how ${topic} evolves over time is literally changing how we think about systems in general. Pretty based when you think about it.`,
    'comedian': `Alright, buckle up for ${topic} - the thing everyone pretends to understand at dinner parties but secretly Googles later! It's like that friend who speaks five languages but still can't figure out how to use a self-checkout machine.\n\nThe hilarious thing about ${topic} is that experts have been arguing about it for decades, writing thousand-page books that basically say "it's complicated." Meanwhile, the rest of us are just trying to understand the basic concept without accidentally revealing our ignorance. It's the academic equivalent of pretending to remember someone's name too long after you should have asked!`
  };
  
  return responses[persona];
}

function getShowerThoughtResponse(topic: string, persona: PersonaMode): string {
  const responses: Record<PersonaMode, string> = {
    'professor': `What if ${topic} is merely our perception of higher-dimensional phenomena projecting onto our limited three-dimensional understanding? Consider this: just as a shadow is a 2D representation of a 3D object, perhaps ${topic} is the "shadow" of something far more complex existing beyond our sensory capabilities.\n\nFurthermore, if our understanding of ${topic} suddenly shifted, would the fundamental nature of reality as we experience it change accordingly? These epistemological boundaries invite profound contemplation.`,
    'geek': `Here's a mind-bender: What if ${topic} is actually a naturally emergent property of complexity, similar to how Conway's Game of Life produces unexpected patterns from simple rules? The computational universe theory suggests that reality itself might be a simulation built on simple mathematical foundations.\n\nAnd consider this: if ${topic} were to be fully simulated at the quantum level, would the simulation itself develop consciousness? The recursive implications are staggering when you apply Gödel's Incompleteness Theorems to self-referential systems like ${topic}.`,
    'genz': `Okay but like... what if ${topic} is just the universe's way of experiencing itself? Like, we think we invented or discovered ${topic}, but maybe it's been waiting for someone to notice it this whole time?\n\nAnd here's something that will literally break your brain: what if ${topic} is completely different in parallel universes? Like in some alternate reality, people are completely shocked at how our version of ${topic} works because theirs is totally different. The multiverse is wild fr fr.`,
    'comedian': `What if ${topic} is just the universe's way of playing a cosmic practical joke? Like, we're all seriously studying and analyzing it, and meanwhile some interdimensional beings are watching us like "Look at them trying to figure it out! Should we tell them it's just space hiccups?"\n\nAnd here's another one: what if ${topic} only works because we believe it works? Like the placebo effect, but for reality itself. One day someone's going to say "wait, that makes no sense" and suddenly ${topic} just stops working worldwide. Chaos ensues. Cats and dogs living together. Mass hysteria!`
  };
  
  return responses[persona];
}
