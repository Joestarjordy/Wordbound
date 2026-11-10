import { DifficultyLevel, GuessEvaluation, LetterTile, WordEntry } from '../types/game';

export const EASY_WORDS: WordEntry[] = [
  // 4-letter universal words
  {
    word: 'BIRD',
    definition: 'A warm-blooded egg-laying vertebrate distinguished by feathers, wings, and a beak.',
    partOfSpeech: 'noun',
    example: 'A colorful blue bird sang perched upon the branch in the morning sun.',
    difficulty: 'easy',
  },
  {
    word: 'BOOK',
    definition: 'A written or printed work consisting of pages glued or sewn together along one side.',
    partOfSpeech: 'noun',
    example: 'She sat comfortably by the window reading her favorite story book.',
    difficulty: 'easy',
  },
  {
    word: 'CITY',
    definition: 'A large town or prominent center of population and commerce.',
    partOfSpeech: 'noun',
    example: 'The glowing city lights shimmered brightly against the midnight sky.',
    difficulty: 'easy',
  },
  {
    word: 'COLD',
    definition: 'Of or at a low or relatively low temperature, especially when compared with the human body.',
    partOfSpeech: 'adjective',
    example: 'A cold morning breeze rustled through the tall grass in the valley.',
    difficulty: 'easy',
  },
  {
    word: 'DARK',
    definition: 'With little or no light, or deep in tint and shade.',
    partOfSpeech: 'adjective',
    example: 'The dark night sky was illuminated by thousands of twinkling stars.',
    difficulty: 'easy',
  },
  {
    word: 'FISH',
    definition: 'A limbless cold-blooded vertebrate animal with gills and fins living wholly in water.',
    partOfSpeech: 'noun',
    example: 'Silver fish darted rapidly through the clear mountain stream.',
    difficulty: 'easy',
  },
  {
    word: 'FOOD',
    definition: 'Any nutritious substance that people or animals eat or drink in order to maintain life.',
    partOfSpeech: 'noun',
    example: 'Good food and clean water restored the travelers after their journey.',
    difficulty: 'easy',
  },
  {
    word: 'GAME',
    definition: 'A form of play or sport, especially a competitive one played according to rules.',
    partOfSpeech: 'noun',
    example: 'They gathered around the campfire to play a spirited board game.',
    difficulty: 'easy',
  },
  {
    word: 'GOLD',
    definition: 'A yellow precious metal valued especially for jewelry, coinage, and decoration.',
    partOfSpeech: 'noun',
    example: 'A bright coin made of pure gold glinted on the merchant table.',
    difficulty: 'easy',
  },
  {
    word: 'HAND',
    definition: 'The end part of a person’s arm beyond the wrist, including digits and palm.',
    partOfSpeech: 'noun',
    example: 'He held out his hand in a warm gesture of friendship and trust.',
    difficulty: 'easy',
  },
  {
    word: 'HOME',
    definition: 'The place where one lives permanently, especially as a member of a family.',
    partOfSpeech: 'noun',
    example: 'After a long trek across continents, it felt wonderful to return home.',
    difficulty: 'easy',
  },
  {
    word: 'HOPE',
    definition: 'A feeling of expectation and desire for a certain thing to happen.',
    partOfSpeech: 'noun',
    example: 'The sunrise brought renewed hope and optimism to all who watched it.',
    difficulty: 'easy',
  },
  {
    word: 'LAND',
    definition: 'The part of the earth’s surface that is not covered by water.',
    partOfSpeech: 'noun',
    example: 'The explorers rejoiced when they finally spotted land on the horizon.',
    difficulty: 'easy',
  },
  {
    word: 'LIFE',
    definition: 'The condition that distinguishes animals and plants from inorganic matter.',
    partOfSpeech: 'noun',
    example: 'Springtime brought vibrant green life bursting across the hillside.',
    difficulty: 'easy',
  },
  {
    word: 'MOON',
    definition: 'The natural satellite of the earth, visible by reflected sunlight at night.',
    partOfSpeech: 'noun',
    example: 'A crescent moon cast a pale silver glow across the quiet lake.',
    difficulty: 'easy',
  },
  {
    word: 'PARK',
    definition: 'A large public garden or area of land used for recreation.',
    partOfSpeech: 'noun',
    example: 'Children ran and laughed along the winding paths of the sunny park.',
    difficulty: 'easy',
  },
  {
    word: 'RAIN',
    definition: 'Moisture condensed from the atmosphere that falls visibly in separate drops.',
    partOfSpeech: 'noun',
    example: 'The gentle summer rain cooled the dry earth and nourished the flowers.',
    difficulty: 'easy',
  },
  {
    word: 'RING',
    definition: 'A small circular band, typically made of precious metal and worn on a finger.',
    partOfSpeech: 'noun',
    example: 'She wore an elegant silver ring adorned with a single polished gem.',
    difficulty: 'easy',
  },
  {
    word: 'ROAD',
    definition: 'A wide way leading from one place to another, especially one with a prepared surface.',
    partOfSpeech: 'noun',
    example: 'The cobblestone road led travelers safely over the rolling green hills.',
    difficulty: 'easy',
  },
  {
    word: 'SNOW',
    definition: 'Atmospheric water vapor frozen into ice crystals and falling in light white flakes.',
    partOfSpeech: 'noun',
    example: 'Fresh white snow blanketed the quiet pine forest overnight.',
    difficulty: 'easy',
  },
  {
    word: 'STAR',
    definition: 'A luminous point in the night sky that is a large, remote incandescent body.',
    partOfSpeech: 'noun',
    example: 'Navigators steered their ships by observing the brightest north star.',
    difficulty: 'easy',
  },
  {
    word: 'TIME',
    definition: 'The indefinite continued progress of existence and events in the past, present, and future.',
    partOfSpeech: 'noun',
    example: 'With enough patience and time, great things can be accomplished.',
    difficulty: 'easy',
  },
  {
    word: 'TREE',
    definition: 'A woody perennial plant, typically having a single stem or trunk growing to a considerable height.',
    partOfSpeech: 'noun',
    example: 'An ancient oak tree provided welcoming shade on a hot summer afternoon.',
    difficulty: 'easy',
  },
  {
    word: 'WIND',
    definition: 'The perceptible natural movement of the air blowing in a particular direction.',
    partOfSpeech: 'noun',
    example: 'A crisp wind filled the sails and propelled the vessel forward.',
    difficulty: 'easy',
  },
  {
    word: 'BALL',
    definition: 'A round object used in games, sports, and recreation.',
    partOfSpeech: 'noun',
    example: 'The children kicked a bright red ball across the field.',
    difficulty: 'easy',
  },
  {
    word: 'BLUE',
    definition: 'A color like the clear daytime sky or deep ocean.',
    partOfSpeech: 'adjective',
    example: 'A blue banner fluttered above the village gate.',
    difficulty: 'easy',
  },
  {
    word: 'BOAT',
    definition: 'A small vessel used for traveling on water.',
    partOfSpeech: 'noun',
    example: 'The wooden boat drifted gently across the quiet lake.',
    difficulty: 'easy',
  },
  {
    word: 'CAMP',
    definition: 'A place where people stay temporarily in tents or simple shelters.',
    partOfSpeech: 'noun',
    example: 'The adventurers built a warm camp beneath the old oak tree.',
    difficulty: 'easy',
  },
  {
    word: 'DUST',
    definition: 'Very small dry particles of earth or other matter.',
    partOfSpeech: 'noun',
    example: 'A cloud of dust rose from the ancient road.',
    difficulty: 'easy',
  },
  {
    word: 'FIRE',
    definition: 'A controlled burning flame that gives heat and light.',
    partOfSpeech: 'noun',
    example: 'The crackling fire kept the travelers warm through the night.',
    difficulty: 'easy',
  },
  {
    word: 'FROG',
    definition: 'A small tailless amphibian that usually lives near water.',
    partOfSpeech: 'noun',
    example: 'A green frog leaped from the reeds into the pond.',
    difficulty: 'easy',
  },
  {
    word: 'GATE',
    definition: 'A movable barrier that controls entry through an opening.',
    partOfSpeech: 'noun',
    example: 'The iron gate opened when the knight spoke the secret word.',
    difficulty: 'easy',
  },
  {
    word: 'GRAY',
    definition: 'A color between black and white.',
    partOfSpeech: 'adjective',
    example: 'Gray clouds gathered above the distant hills.',
    difficulty: 'easy',
  },
  {
    word: 'HILL',
    definition: 'A naturally raised area of land smaller than a mountain.',
    partOfSpeech: 'noun',
    example: 'The watchtower stood on the highest hill in the realm.',
    difficulty: 'easy',
  },
  {
    word: 'KING',
    definition: 'A male ruler of a kingdom.',
    partOfSpeech: 'noun',
    example: 'The king welcomed the victorious knight into the royal hall.',
    difficulty: 'easy',
  },
  {
    word: 'LAKE',
    definition: 'A large body of water surrounded by land.',
    partOfSpeech: 'noun',
    example: 'Silver fish moved beneath the surface of the clear lake.',
    difficulty: 'easy',
  },
  {
    word: 'LEAF',
    definition: 'A flat green part of a plant that grows from a stem or branch.',
    partOfSpeech: 'noun',
    example: 'A golden leaf landed softly on the forest path.',
    difficulty: 'easy',
  },
  {
    word: 'LION',
    definition: 'A large wild cat known for its strength and mane.',
    partOfSpeech: 'noun',
    example: 'The proud lion watched over the edge of the savanna.',
    difficulty: 'easy',
  },
  {
    word: 'NEST',
    definition: 'A structure built by a bird for laying eggs and raising young.',
    partOfSpeech: 'noun',
    example: 'The tiny bird returned to its nest at sunset.',
    difficulty: 'easy',
  },
  {
    word: 'POND',
    definition: 'A small area of still water.',
    partOfSpeech: 'noun',
    example: 'Fireflies glowed above the pond after dusk.',
    difficulty: 'easy',
  },
  {
    word: 'SAND',
    definition: 'Loose grains of rock commonly found on beaches and deserts.',
    partOfSpeech: 'noun',
    example: 'The travelers crossed warm sand beneath the desert sun.',
    difficulty: 'easy',
  },
  {
    word: 'SHIP',
    definition: 'A large vessel designed to travel across seas or oceans.',
    partOfSpeech: 'noun',
    example: 'The trading ship sailed toward the harbor at dawn.',
    difficulty: 'easy',
  },
  {
    word: 'SONG',
    definition: 'A short musical composition intended to be sung.',
    partOfSpeech: 'noun',
    example: 'The bard performed a cheerful song beside the campfire.',
    difficulty: 'easy',
  },
  {
    word: 'SHELL',
    definition: 'A hard protective outer covering found on some animals.',
    partOfSpeech: 'noun',
    example: 'She found a polished shell beside the quiet river.',
    difficulty: 'easy',
  },
  {
    word: 'SWORD',
    definition: 'A weapon with a long sharp blade and a handle.',
    partOfSpeech: 'noun',
    example: 'The knight raised a shining sword above the defeated foe.',
    difficulty: 'easy',
  },
  {
    word: 'TRAIL',
    definition: 'A path or track through the countryside or wilderness.',
    partOfSpeech: 'noun',
    example: 'The narrow trail wound through the whispering woods.',
    difficulty: 'easy',
  },
  {
    word: 'WALL',
    definition: 'A vertical structure that encloses or divides an area.',
    partOfSpeech: 'noun',
    example: 'A high stone wall protected the village from the storm.',
    difficulty: 'easy',
  },
  {
    word: 'WAVE',
    definition: 'A raised movement of water that travels across its surface.',
    partOfSpeech: 'noun',
    example: 'A bright wave rolled toward the sandy shore.',
    difficulty: 'easy',
  },

  // 5-letter universal words
  {
    word: 'BEACH',
    definition: 'A pebbly or sandy shore, especially by the ocean or a lake between high- and low-water marks.',
    partOfSpeech: 'noun',
    example: 'They strolled along the warm sandy beach collecting smooth sea shells.',
    difficulty: 'easy',
  },
  {
    word: 'BREAD',
    definition: 'Food made of flour, water, and yeast or another leavening agent, mixed and baked.',
    partOfSpeech: 'noun',
    example: 'The enticing aroma of freshly baked warm bread filled the kitchen.',
    difficulty: 'easy',
  },
  {
    word: 'CHAIR',
    definition: 'A separate seat for one person, typically with four legs and a back.',
    partOfSpeech: 'noun',
    example: 'He settled into the comfortable wooden rocking chair beside the hearth.',
    difficulty: 'easy',
  },
  {
    word: 'CLOCK',
    definition: 'A mechanical or electrical device for measuring and showing time.',
    partOfSpeech: 'noun',
    example: 'The grandfather clock in the quiet hall ticked with steady precision.',
    difficulty: 'easy',
  },
  {
    word: 'CLOUD',
    definition: 'A visible mass of condensed water vapor floating in the atmosphere.',
    partOfSpeech: 'noun',
    example: 'A fluffy white cloud drifted lazily across the bright blue afternoon sky.',
    difficulty: 'easy',
  },
  {
    word: 'DANCE',
    definition: 'Move rhythmically to music, typically following a set sequence of steps.',
    partOfSpeech: 'verb',
    example: 'Couples began to dance gracefully under the sparkling lanterns.',
    difficulty: 'easy',
  },
  {
    word: 'DREAM',
    definition: 'A series of thoughts, images, and sensations occurring in a person’s mind during sleep.',
    partOfSpeech: 'noun',
    example: 'She held onto her childhood dream of exploring distant galaxies.',
    difficulty: 'easy',
  },
  {
    word: 'EARTH',
    definition: 'The planet on which we live; the world or the substance of the land surface.',
    partOfSpeech: 'noun',
    example: 'The rich dark earth was ready for planting seeds in early springtime.',
    difficulty: 'easy',
  },
  {
    word: 'FRUIT',
    definition: 'The sweet and fleshy product of a tree or other plant that contains seed.',
    partOfSpeech: 'noun',
    example: 'A basket filled with fresh ripe fruit sat in the center of the table.',
    difficulty: 'easy',
  },
  {
    word: 'GLASS',
    definition: 'A hard, brittle, typically transparent substance made by fusing sand with soda and lime.',
    partOfSpeech: 'noun',
    example: 'She poured clean cool water into a tall crystal glass.',
    difficulty: 'easy',
  },
  {
    word: 'GREEN',
    definition: 'Of the color between blue and yellow in the spectrum; colored like growing grass.',
    partOfSpeech: 'adjective',
    example: 'Lush green valleys stretched out as far as the eye could see.',
    difficulty: 'easy',
  },
  {
    word: 'HEART',
    definition: 'A hollow muscular organ that pumps blood, often symbolizing affection and courage.',
    partOfSpeech: 'noun',
    example: 'She poured her entire heart and soul into creating the musical masterpiece.',
    difficulty: 'easy',
  },
  {
    word: 'HOUSE',
    definition: 'A building for human habitation, especially one that is lived in by a family.',
    partOfSpeech: 'noun',
    example: 'Smoke drifted lazily from the chimney of the cozy country house.',
    difficulty: 'easy',
  },
  {
    word: 'LIGHT',
    definition: 'The natural agent that stimulates sight and makes things visible.',
    partOfSpeech: 'noun',
    example: 'Golden morning light filtered through the forest canopy onto the path.',
    difficulty: 'easy',
  },
  {
    word: 'MUSIC',
    definition: 'Vocal or instrumental sounds combined in such a way as to produce beauty of form and emotion.',
    partOfSpeech: 'noun',
    example: 'The cheerful music lifted everyone’s spirits during the celebration.',
    difficulty: 'easy',
  },
  {
    word: 'NIGHT',
    definition: 'The period of darkness in each twenty-four hours; the time from sunset to sunrise.',
    partOfSpeech: 'noun',
    example: 'The cool quiet night brought deep and restful sleep to the village.',
    difficulty: 'easy',
  },
  {
    word: 'OCEAN',
    definition: 'A very large expanse of sea, in particular each of the main areas into which the sea is divided.',
    partOfSpeech: 'noun',
    example: 'Gentle waves from the vast blue ocean rolled against the shore.',
    difficulty: 'easy',
  },
  {
    word: 'PEACE',
    definition: 'Freedom from disturbance; tranquility, harmony, and calm.',
    partOfSpeech: 'noun',
    example: 'Sitting quietly by the babbling brook brought deep inner peace.',
    difficulty: 'easy',
  },
  {
    word: 'PLANT',
    definition: 'A living organism of the kind exemplified by trees, shrubs, herbs, and grasses.',
    partOfSpeech: 'noun',
    example: 'A small flowering green plant sprouted through the garden soil.',
    difficulty: 'easy',
  },
  {
    word: 'RIVER',
    definition: 'A large natural stream of water flowing in a channel to the sea, a lake, or another river.',
    partOfSpeech: 'noun',
    example: 'A winding river carved a breathtaking canyon through the red sandstone.',
    difficulty: 'easy',
  },
  {
    word: 'SMILE',
    definition: 'Form one’s features into a pleased, kind, or amused expression.',
    partOfSpeech: 'noun',
    example: 'Her warm radiant smile instantly brightened the whole room.',
    difficulty: 'easy',
  },
  {
    word: 'SPACE',
    definition: 'The physical universe beyond the earth’s atmosphere, or a continuous area that is free and available.',
    partOfSpeech: 'noun',
    example: 'Astronomers gaze out into deep space studying distant stars and galaxies.',
    difficulty: 'easy',
  },
  {
    word: 'STORM',
    definition: 'A violent disturbance of the atmosphere with strong winds and usually rain, thunder, lightning, or snow.',
    partOfSpeech: 'noun',
    example: 'The sudden summer storm passed quickly and left behind a vibrant rainbow.',
    difficulty: 'easy',
  },
  {
    word: 'TRAIN',
    definition: 'A series of railroad cars moved as a unit by a locomotive or by integral motors.',
    partOfSpeech: 'noun',
    example: 'The passenger train sped smoothly along the coastal tracks.',
    difficulty: 'easy',
  },
  {
    word: 'WATER',
    definition: 'A colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain.',
    partOfSpeech: 'noun',
    example: 'A sip of cold fresh spring water was the most refreshing drink.',
    difficulty: 'easy',
  },
  {
    word: 'WORLD',
    definition: 'The earth, together with all of its countries, peoples, and natural features.',
    partOfSpeech: 'noun',
    example: 'Traveling across continents opened his eyes to the beauty of the world.',
    difficulty: 'easy',
  },
];

export const MEDIUM_WORDS: WordEntry[] = [
  // 5-letter medium universal words
  {
    word: 'APPLE',
    definition: 'The round fruit of a tree of the rose family, which typically has thin red or green skin and crisp flesh.',
    partOfSpeech: 'noun',
    example: 'He picked a crisp red apple right off the orchard tree.',
    difficulty: 'medium',
  },
  {
    word: 'BRAIN',
    definition: 'An organ of soft nervous tissue contained in the skull of vertebrates, functioning as the coordinating center of sensation.',
    partOfSpeech: 'noun',
    example: 'Solving challenging logic puzzles helps exercise the human brain.',
    difficulty: 'medium',
  },
  {
    word: 'CANDLE',
    definition: 'A cylinder or block of wax or tallow with a central wick that is lit to produce light as it burns.',
    partOfSpeech: 'noun',
    example: 'A flickering beeswax candle illuminated the quiet study room.',
    difficulty: 'medium',
  },
  {
    word: 'EAGLE',
    definition: 'A large bird of prey with a massive hooked bill and long broad wings, renowned for its keen sight.',
    partOfSpeech: 'noun',
    example: 'A majestic eagle soared high above the towering mountain peaks.',
    difficulty: 'medium',
  },
  {
    word: 'FLAME',
    definition: 'A hot glowing body of ignited gas that is generated by something on fire.',
    partOfSpeech: 'noun',
    example: 'A dancing orange flame kept the evening camp warm and welcoming.',
    difficulty: 'medium',
  },
  {
    word: 'GRAPE',
    definition: 'A berry, typically green, purple, or black, growing in clusters on a grapevine.',
    partOfSpeech: 'noun',
    example: 'Sweet purple grapes hung in heavy bunches beneath the arbor.',
    difficulty: 'medium',
  },
  {
    word: 'HORSE',
    definition: 'A solid-hoofed plant-eating domesticated mammal with a flowing mane and tail.',
    partOfSpeech: 'noun',
    example: 'The spirited chestnut horse galloped gracefully across the open meadow.',
    difficulty: 'medium',
  },
  {
    word: 'LEMON',
    definition: 'A yellow, oval citrus fruit with thick skin and fragrant, sour juice.',
    partOfSpeech: 'noun',
    example: 'A squeeze of fresh tart lemon added zest to the chilled beverage.',
    difficulty: 'medium',
  },
  {
    word: 'MAGIC',
    definition: 'The power of apparently influencing events by using mysterious or supernatural forces.',
    partOfSpeech: 'noun',
    example: 'The glowing aurora borealis looked like pure natural magic in the night.',
    difficulty: 'medium',
  },
  {
    word: 'MONEY',
    definition: 'A current medium of exchange in the form of coins and banknotes.',
    partOfSpeech: 'noun',
    example: 'Saving money diligently helped her fund her dream around the world.',
    difficulty: 'medium',
  },
  {
    word: 'MOUNT',
    definition: 'A mountain or hill, or to climb up or ascend.',
    partOfSpeech: 'noun',
    example: 'They reached the peak of Mount Rainier just as dawn broke.',
    difficulty: 'medium',
  },
  {
    word: 'PAPER',
    definition: 'Material manufactured in thin sheets from the pulp of wood, used for writing, drawing, or wrapping.',
    partOfSpeech: 'noun',
    example: 'He sketched a detailed landscape on a crisp sheet of drawing paper.',
    difficulty: 'medium',
  },
  {
    word: 'PIANO',
    definition: 'A large keyboard musical instrument with a wooden case enclosing a soundboard and metal strings.',
    partOfSpeech: 'noun',
    example: 'She played a captivating sonata on the concert grand piano.',
    difficulty: 'medium',
  },
  {
    word: 'PLANET',
    definition: 'A celestial body moving in an elliptical orbit around a star.',
    partOfSpeech: 'noun',
    example: 'Jupiter is the largest planet orbiting within our solar system.',
    difficulty: 'medium',
  },
  {
    word: 'QUEEN',
    definition: 'The female ruler of an independent state, especially one who inherits the position by right of birth.',
    partOfSpeech: 'noun',
    example: 'The wise queen was celebrated across the kingdom for her fairness.',
    difficulty: 'medium',
  },
  {
    word: 'SHINE',
    definition: 'Give out or reflect bright light.',
    partOfSpeech: 'verb',
    example: 'Polished silverware began to shine brightly under the dining room chandelier.',
    difficulty: 'medium',
  },
  {
    word: 'SMART',
    definition: 'Having or showing a quick-witted intelligence.',
    partOfSpeech: 'adjective',
    example: 'A smart strategy and calm demeanor won the tournament.',
    difficulty: 'medium',
  },
  {
    word: 'STONE',
    definition: 'Hard solid nonmetallic mineral matter of which rock is made, used for building.',
    partOfSpeech: 'noun',
    example: 'The ancient stone bridge had stood firm over the river for centuries.',
    difficulty: 'medium',
  },
  {
    word: 'SUGAR',
    definition: 'A sweet crystalline substance obtained from various plants, especially sugar cane and sugar beet.',
    partOfSpeech: 'noun',
    example: 'A sprinkle of brown sugar complemented the warm cinnamon oatmeal.',
    difficulty: 'medium',
  },
  {
    word: 'TABLE',
    definition: 'A piece of furniture with a flat top and one or more legs, providing a level surface.',
    partOfSpeech: 'noun',
    example: 'The family gathered around the wooden dining table every evening.',
    difficulty: 'medium',
  },
  {
    word: 'TIGER',
    definition: 'A very large solitary cat with a yellow-brown coat striped with black, native to the forests of Asia.',
    partOfSpeech: 'noun',
    example: 'The majestic striped tiger stalked silently through the dense bamboo.',
    difficulty: 'medium',
  },
  {
    word: 'TOWER',
    definition: 'A tall, narrow building, either freestanding or forming part of a building such as a church or castle.',
    partOfSpeech: 'noun',
    example: 'The clock tower chimed twelve resonant bells across the square.',
    difficulty: 'medium',
  },
  {
    word: 'TRACK',
    definition: 'A rough path or road, or a continuous line of rails on a railroad.',
    partOfSpeech: 'noun',
    example: 'Hikers followed a winding forest track up toward the scenic overlook.',
    difficulty: 'medium',
  },
  {
    word: 'YOUTH',
    definition: 'The period between childhood and adult age, or the state of being young.',
    partOfSpeech: 'noun',
    example: 'In his youth, he loved running barefoot through the summer pastures.',
    difficulty: 'medium',
  },

  // 6-letter medium universal words
  {
    word: 'ANIMAL',
    definition: 'A living organism that feeds on organic matter, typically having specialized sense organs.',
    partOfSpeech: 'noun',
    example: 'Every wild animal in the national park is protected by conservation law.',
    difficulty: 'medium',
  },
  {
    word: 'BRIDGE',
    definition: 'A structure carrying a road, path, railway, or canal across a river, ravine, or other obstacle.',
    partOfSpeech: 'noun',
    example: 'The suspension bridge spanned the wide bay with graceful steel cables.',
    difficulty: 'medium',
  },
  {
    word: 'CAMERA',
    definition: 'A device for recording visual images in the form of photographs, film, or video signals.',
    partOfSpeech: 'noun',
    example: 'She brought her digital camera to capture the dramatic mountain sunset.',
    difficulty: 'medium',
  },
  {
    word: 'CASTLE',
    definition: 'A large building or group of buildings fortified against attack with thick walls and battlements.',
    partOfSpeech: 'noun',
    example: 'The medieval stone castle stood proud on top of the limestone cliff.',
    difficulty: 'medium',
  },
  {
    word: 'COFFEE',
    definition: 'A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub.',
    partOfSpeech: 'noun',
    example: 'A steaming cup of dark roast coffee greeted the early morning travelers.',
    difficulty: 'medium',
  },
  {
    word: 'DOCTOR',
    definition: 'A qualified practitioner of medicine; a physician.',
    partOfSpeech: 'noun',
    example: 'The compassionate doctor tended carefully to every patient in the clinic.',
    difficulty: 'medium',
  },
  {
    word: 'FLOWER',
    definition: 'The seed-bearing part of a plant, consisting of reproductive organs that are typically surrounded by brightly colored petals.',
    partOfSpeech: 'noun',
    example: 'A vibrant yellow flower bloomed brightly beside the front walkway.',
    difficulty: 'medium',
  },
  {
    word: 'FOREST',
    definition: 'A large area covered chiefly with trees and undergrowth.',
    partOfSpeech: 'noun',
    example: 'A peaceful pine forest stretched across the mountain valley.',
    difficulty: 'medium',
  },
  {
    word: 'FRIEND',
    definition: 'A person whom one knows and with whom one has a bond of mutual affection.',
    partOfSpeech: 'noun',
    example: 'A loyal friend stood by him through times of triumph and hardship.',
    difficulty: 'medium',
  },
  {
    word: 'GARDEN',
    definition: 'A piece of ground adjoining a house, used for growing flowers, fruit, or vegetables.',
    partOfSpeech: 'noun',
    example: 'The lush botanical garden was fragrant with blooming roses and lavender.',
    difficulty: 'medium',
  },
  {
    word: 'ISLAND',
    definition: 'A piece of land surrounded by water.',
    partOfSpeech: 'noun',
    example: 'They sailed to a secluded tropical island surrounded by coral reefs.',
    difficulty: 'medium',
  },
  {
    word: 'MONKEY',
    definition: 'A small to medium-sized primate that typically has a long tail, most kinds of which live in trees in tropical countries.',
    partOfSpeech: 'noun',
    example: 'A curious monkey swung effortlessly from one rainforest branch to the next.',
    difficulty: 'medium',
  },
  {
    word: 'NATURE',
    definition: 'The phenomena of the physical world collectively, including plants, animals, the landscape, and other features.',
    partOfSpeech: 'noun',
    example: 'Spending quiet time in nature brings a profound sense of rejuvenation.',
    difficulty: 'medium',
  },
  {
    word: 'ORANGE',
    definition: 'A round juicy citrus fruit with a tough bright reddish-yellow rind, or the color between red and yellow.',
    partOfSpeech: 'noun',
    example: 'She peeled a sweet ripe orange and shared the juicy segments.',
    difficulty: 'medium',
  },
  {
    word: 'PURPLE',
    definition: 'A color intermediate between red and blue.',
    partOfSpeech: 'adjective',
    example: 'The evening horizon was painted in deep purple and scarlet hues.',
    difficulty: 'medium',
  },
  {
    word: 'ROCKET',
    definition: 'A cylindrical projectile that can be propelled to a great height or into space by the combustion of propellant.',
    partOfSpeech: 'noun',
    example: 'The space rocket lifted off with a thunderous roar toward the stars.',
    difficulty: 'medium',
  },
  {
    word: 'SCHOOL',
    definition: 'An institution for educating children or specialized instruction.',
    partOfSpeech: 'noun',
    example: 'The students gathered outside the school steps on the first day of class.',
    difficulty: 'medium',
  },
  {
    word: 'SHADOW',
    definition: 'A dark area or shape produced by a body coming between rays of light and a surface.',
    partOfSpeech: 'noun',
    example: 'The tall sundial cast a sharp dark shadow showing three in the afternoon.',
    difficulty: 'medium',
  },
  {
    word: 'SILVER',
    definition: 'A precious shiny grayish-white metal, highly ductile and malleable.',
    partOfSpeech: 'noun',
    example: 'The moonlight reflected off the calm water like a ribbon of liquid silver.',
    difficulty: 'medium',
  },
  {
    word: 'SPRING',
    definition: 'The season between winter and summer during which temperatures gradually rise and vegetation blooms.',
    partOfSpeech: 'noun',
    example: 'Every spring, colorful wildflowers carpeted the green hillsides.',
    difficulty: 'medium',
  },
  {
    word: 'STREET',
    definition: 'A public road in a city or town, typically with houses or buildings on one or both sides.',
    partOfSpeech: 'noun',
    example: 'The historic cobblestone street was lined with quaint cafes and bakeries.',
    difficulty: 'medium',
  },
  {
    word: 'SUMMER',
    definition: 'The warmest season of the year, in the northern hemisphere from June to August and in the southern from December to February.',
    partOfSpeech: 'noun',
    example: 'Long warm summer afternoons were spent swimming in the mountain lake.',
    difficulty: 'medium',
  },
  {
    word: 'SUNSET',
    definition: 'The time in the evening when the sun disappears or daylight fades.',
    partOfSpeech: 'noun',
    example: 'Crowds gathered along the coastal bluffs to admire the magnificent sunset.',
    difficulty: 'medium',
  },
  {
    word: 'TRAVEL',
    definition: 'Make a journey, typically of some length or abroad.',
    partOfSpeech: 'verb',
    example: 'They packed their backpacks eager to travel through uncharted lands.',
    difficulty: 'medium',
  },
  {
    word: 'VALLEY',
    definition: 'A low area of land between hills or mountains, typically with a river or stream flowing through it.',
    partOfSpeech: 'noun',
    example: 'Mist drifted gently across the fertile river valley at daybreak.',
    difficulty: 'medium',
  },
  {
    word: 'WINDOW',
    definition: 'An opening in a wall or door fitted with glass in a frame for admitting light and air.',
    partOfSpeech: 'noun',
    example: 'Sunlight poured through the bay window and warmed the cozy parlor.',
    difficulty: 'medium',
  },
  {
    word: 'WINTER',
    definition: 'The coldest season of the year, in the northern hemisphere from December to February.',
    partOfSpeech: 'noun',
    example: 'During winter, the mountain roads were framed with tall drifts of snow.',
    difficulty: 'medium',
  },
  {
    word: 'ALERT',
    definition: 'Quick to notice danger or unusual activity.',
    partOfSpeech: 'adjective',
    example: 'The alert scout noticed footprints beside the ruined bridge.',
    difficulty: 'medium',
  },
  {
    word: 'ANGEL',
    definition: 'A spiritual messenger or being of great goodness.',
    partOfSpeech: 'noun',
    example: 'The stained-glass angel shone above the chapel doors.',
    difficulty: 'medium',
  },
  {
    word: 'ARROW',
    definition: 'A slender shaft shot from a bow.',
    partOfSpeech: 'noun',
    example: 'The archer sent an arrow cleanly through the target.',
    difficulty: 'medium',
  },
  {
    word: 'BLADE',
    definition: 'The flat cutting part of a knife, sword, or similar tool.',
    partOfSpeech: 'noun',
    example: 'A polished blade caught the torchlight in the crypt.',
    difficulty: 'medium',
  },
  {
    word: 'CROWN',
    definition: 'A decorative headpiece worn by a monarch or ruler.',
    partOfSpeech: 'noun',
    example: 'The crystal crown rested inside a guarded glass case.',
    difficulty: 'medium',
  },
  {
    word: 'FABLE',
    definition: 'A short story that teaches a moral lesson, often using animals.',
    partOfSpeech: 'noun',
    example: 'The elder told an old fable beside the winter fire.',
    difficulty: 'medium',
  },
  {
    word: 'GIANT',
    definition: 'A person or creature of unusually great size or strength.',
    partOfSpeech: 'noun',
    example: 'A stone giant guarded the entrance to the quarry.',
    difficulty: 'medium',
  },
  {
    word: 'GRACE',
    definition: 'Simple elegance of movement, manner, or appearance.',
    partOfSpeech: 'noun',
    example: 'The dancer moved with remarkable grace across the stage.',
    difficulty: 'medium',
  },
  {
    word: 'GUARD',
    definition: 'A person who protects a place, person, or object.',
    partOfSpeech: 'noun',
    example: 'The castle guard watched the bridge throughout the night.',
    difficulty: 'medium',
  },
  {
    word: 'HONEY',
    definition: 'A sweet substance made by bees from flower nectar.',
    partOfSpeech: 'noun',
    example: 'The baker added honey to the warm spiced bread.',
    difficulty: 'medium',
  },
  {
    word: 'RANGER',
    definition: 'A person who protects a natural park or wild area.',
    partOfSpeech: 'noun',
    example: 'The forest ranger guided the travelers toward the safe trail.',
    difficulty: 'medium',
  },
  {
    word: 'JEWEL',
    definition: 'A precious stone or ornament made from one.',
    partOfSpeech: 'noun',
    example: 'A violet jewel glowed inside the ancient temple.',
    difficulty: 'medium',
  },
  {
    word: 'MARSH',
    definition: 'An area of soft wet land, often covered with grasses.',
    partOfSpeech: 'noun',
    example: 'Mist rose from the marsh as the party moved toward the ruins.',
    difficulty: 'medium',
  },
  {
    word: 'NOBLE',
    definition: 'Having fine personal qualities or high moral principles.',
    partOfSpeech: 'adjective',
    example: 'The noble knight gave the rescued villagers his reward.',
    difficulty: 'medium',
  },
  {
    word: 'OASIS',
    definition: 'A fertile place in a desert where water is available.',
    partOfSpeech: 'noun',
    example: 'The travelers rested beside a palm-filled oasis.',
    difficulty: 'medium',
  },
  {
    word: 'ORBIT',
    definition: 'The curved path followed by an object around a planet or star.',
    partOfSpeech: 'noun',
    example: 'The moon completes its orbit around the earth.',
    difficulty: 'medium',
  },
  {
    word: 'PILLOW',
    definition: 'A soft cushion used to support the head during rest.',
    partOfSpeech: 'noun',
    example: 'The innkeeper placed a clean pillow on the small bed.',
    difficulty: 'medium',
  },
  {
    word: 'PIRATE',
    definition: 'A person who attacks and robs ships at sea.',
    partOfSpeech: 'noun',
    example: 'The pirate captain hid a map beneath the ship deck.',
    difficulty: 'medium',
  },
  {
    word: 'RIDDLE',
    definition: 'A puzzling question or statement that requires thought to solve.',
    partOfSpeech: 'noun',
    example: 'The gate opened only after the hero answered the riddle.',
    difficulty: 'medium',
  },
  {
    word: 'SHELTER',
    definition: 'A place that provides protection from weather or danger.',
    partOfSpeech: 'noun',
    example: 'The travelers found shelter inside an abandoned watchtower.',
    difficulty: 'medium',
  },
  {
    word: 'SPIRIT',
    definition: 'A nonphysical being or the inner character of a person.',
    partOfSpeech: 'noun',
    example: 'The spirit of the forest appeared beneath the silver moon.',
    difficulty: 'medium',
  },
  {
    word: 'TALENT',
    definition: 'A natural ability or skill.',
    partOfSpeech: 'noun',
    example: 'Her talent for healing made her famous across the realm.',
    difficulty: 'medium',
  },
  {
    word: 'TEMPER',
    definition: 'A person’s state of mind or emotional condition.',
    partOfSpeech: 'noun',
    example: 'The captain kept a calm temper during the dangerous crossing.',
    difficulty: 'medium',
  },
  {
    word: 'WANDER',
    definition: 'To move without a fixed destination or purpose.',
    partOfSpeech: 'verb',
    example: 'Travelers wander through the realm searching for hidden runes.',
    difficulty: 'medium',
  },
  {
    word: 'WARRIOR',
    definition: 'A person experienced in or engaged in battle.',
    partOfSpeech: 'noun',
    example: 'The veteran warrior trained new recruits at sunrise.',
    difficulty: 'medium',
  },
];

export const HARD_WORDS: WordEntry[] = [
  // 6-letter rich universal words
  {
    word: 'ARCHER',
    definition: 'A person who shoots with a bow and arrows, especially at a target or in warfare.',
    partOfSpeech: 'noun',
    example: 'The skilled archer hit the center bullseye from eighty paces away.',
    difficulty: 'hard',
  },
  {
    word: 'BREEZE',
    definition: 'A gentle, pleasant wind.',
    partOfSpeech: 'noun',
    example: 'A cool oceanic breeze rustled the palm fronds along the coast.',
    difficulty: 'hard',
  },
  {
    word: 'BRIGHT',
    definition: 'Giving out or reflecting a lot of light; shining.',
    partOfSpeech: 'adjective',
    example: 'A bright constellation guided the navigators safely across the ocean.',
    difficulty: 'hard',
  },
  {
    word: 'BRONZE',
    definition: 'A yellowish-brown alloy of copper with up to one-third tin, used for sculpture and medals.',
    partOfSpeech: 'noun',
    example: 'A towering bronze statue of the founder stood in the central plaza.',
    difficulty: 'hard',
  },
  {
    word: 'CANYON',
    definition: 'A deep gorge, typically one with a river flowing through it.',
    partOfSpeech: 'noun',
    example: 'The Colorado River carved the immense red rock Grand Canyon over millions of years.',
    difficulty: 'hard',
  },
  {
    word: 'DESERT',
    definition: 'A dry, barren area of land, especially one relatively devoid of water and vegetation.',
    partOfSpeech: 'noun',
    example: 'Golden dunes shifted across the vast Sahara desert in the desert wind.',
    difficulty: 'hard',
  },
  {
    word: 'DRAGON',
    definition: 'A mythical monster like a giant reptile, typically having wings, claws, and breathing fire.',
    partOfSpeech: 'noun',
    example: 'Ancient legends told of a slumbering dragon guarding a mountain of emeralds.',
    difficulty: 'hard',
  },
  {
    word: 'EMPIRE',
    definition: 'An extensive group of states or countries ruled over by a single monarch or supreme authority.',
    partOfSpeech: 'noun',
    example: 'Ruins of aqueducts and temples mark the far reach of the ancient empire.',
    difficulty: 'hard',
  },
  {
    word: 'ENERGY',
    definition: 'The strength and vitality required for sustained physical or mental activity; power derived from physical resources.',
    partOfSpeech: 'noun',
    example: 'Solar panels converted bright sunlight into clean electrical energy.',
    difficulty: 'hard',
  },
  {
    word: 'ENGINE',
    definition: 'A machine with moving parts that converts power into motion.',
    partOfSpeech: 'noun',
    example: 'The locomotive engine hummed with tremendous power as the train pulled out.',
    difficulty: 'hard',
  },
  {
    word: 'FLIGHT',
    definition: 'The action or process of flying through the air.',
    partOfSpeech: 'noun',
    example: 'The migratory birds embarked on their annual southward flight.',
    difficulty: 'hard',
  },
  {
    word: 'FROZEN',
    definition: 'Having turned into ice as a result of extreme cold.',
    partOfSpeech: 'adjective',
    example: 'Children ice-skated joyfully across the thick frozen pond.',
    difficulty: 'hard',
  },
  {
    word: 'GALAXY',
    definition: 'A system of millions or billions of stars, together with gas and dust, held together by gravitational attraction.',
    partOfSpeech: 'noun',
    example: 'The Milky Way galaxy spans over one hundred thousand light-years in diameter.',
    difficulty: 'hard',
  },
  {
    word: 'HARBOR',
    definition: 'A place on the coast where vessels may find shelter, especially one protected from rough water by piers or jetties.',
    partOfSpeech: 'noun',
    example: 'Dozens of colorful fishing boats were moored safely in the calm harbor.',
    difficulty: 'hard',
  },
  {
    word: 'IMPACT',
    definition: 'The action of one object coming forcibly into contact with another, or a marked effect or influence.',
    partOfSpeech: 'noun',
    example: 'The inspiring lecture had a lasting positive impact on the students.',
    difficulty: 'hard',
  },
  {
    word: 'JUNGLE',
    definition: 'An area of land overgrown with dense forest and tangled vegetation, typically in the tropics.',
    partOfSpeech: 'noun',
    example: 'Chirping toucans and rustling leaves filled the dense Amazon jungle.',
    difficulty: 'hard',
  },
  {
    word: 'KNIGHT',
    definition: 'A person granted an honorary title of knighthood for service to the realm.',
    partOfSpeech: 'noun',
    example: 'The valiant knight swore an oath to defend the innocent with honor.',
    difficulty: 'hard',
  },
  {
    word: 'LANTERN',
    definition: 'A lamp with a transparent case protecting the flame or electric bulb, and typically having a handle.',
    partOfSpeech: 'noun',
    example: 'The night watchman held a brass lantern as he patrolled the stone corridors.',
    difficulty: 'hard',
  },
  {
    word: 'LEGEND',
    definition: 'A traditional story sometimes popularly regarded as historical but unauthenticated.',
    partOfSpeech: 'noun',
    example: 'Generations passed down the inspiring legend of the courageous folk hero.',
    difficulty: 'hard',
  },
  {
    word: 'MARBLE',
    definition: 'A hard crystalline metamorphic form of limestone, typically white with colored mottlings or streaks.',
    partOfSpeech: 'noun',
    example: 'The grand palace featured polished white marble pillars and archways.',
    difficulty: 'hard',
  },
  {
    word: 'MEMORY',
    definition: 'The faculty by which the mind stores and remembers information.',
    partOfSpeech: 'noun',
    example: 'Walking along the old boardwalk brought back a cherished childhood memory.',
    difficulty: 'hard',
  },
  {
    word: 'MIRROR',
    definition: 'A reflective surface, now typically of glass coated with a metal amalgam, that reflects a clear image.',
    partOfSpeech: 'noun',
    example: 'The calm lake was like a giant silver mirror reflecting the mountain.',
    difficulty: 'hard',
  },
  {
    word: 'OXYGEN',
    definition: 'A colorless, odorless reactive gas that is the chemical element of atomic number 8 and the life-supporting component of air.',
    partOfSpeech: 'noun',
    example: 'Trees in the forest continuously produce clean life-sustaining oxygen.',
    difficulty: 'hard',
  },
  {
    word: 'PALACE',
    definition: 'A large and impressive building forming the official residence of a ruler, state dignitary, or other person of high rank.',
    partOfSpeech: 'noun',
    example: 'Visitors marveled at the ornate ceilings inside the royal palace.',
    difficulty: 'hard',
  },
  {
    word: 'PUZZLE',
    definition: 'A game, problem, or toy designed to test ingenuity or knowledge.',
    partOfSpeech: 'noun',
    example: 'They spent the rainy afternoon piecing together a thousand-piece jigsaw puzzle.',
    difficulty: 'hard',
  },
  {
    word: 'QUANTUM',
    definition: 'A discrete quantity of energy proportional in magnitude to the frequency of the radiation it represents.',
    partOfSpeech: 'noun',
    example: 'Physicists study the extraordinary behavior of subatomic particles in quantum mechanics.',
    difficulty: 'hard',
  },
  {
    word: 'RHYTHM',
    definition: 'A strong, regular, repeated pattern of movement or sound.',
    partOfSpeech: 'noun',
    example: 'The steady rhythm of the drums resonated throughout the concert hall.',
    difficulty: 'hard',
  },
  {
    word: 'SHIELD',
    definition: 'A broad piece of metal or another suitable material held by straps or a handle to protect oneself against blows.',
    partOfSpeech: 'noun',
    example: 'The guardian raised a sturdy polished shield to deflect incoming arrows.',
    difficulty: 'hard',
  },
  {
    word: 'SIGNAL',
    definition: 'A gesture, action, or sound that is used to convey information or instructions.',
    partOfSpeech: 'noun',
    example: 'A bright green flare served as the agreed signal to begin the rescue mission.',
    difficulty: 'hard',
  },
  {
    word: 'SPIDER',
    definition: 'An eight-legged predatory arachnid with an unsegmented abdomen that spins silk webs.',
    partOfSpeech: 'noun',
    example: 'Morning dew glistened like diamonds along the intricate web spun by a garden spider.',
    difficulty: 'hard',
  },
  {
    word: 'STREAM',
    definition: 'A small, narrow river of clean flowing water.',
    partOfSpeech: 'noun',
    example: 'A sparkling alpine stream tumbled over mossy boulders down the hillside.',
    difficulty: 'hard',
  },
  {
    word: 'SYSTEM',
    definition: 'A set of connected things or parts forming a complex whole, in particular a set of principles or procedures.',
    partOfSpeech: 'noun',
    example: 'Engineers designed an efficient solar power system for the entire community.',
    difficulty: 'hard',
  },
  {
    word: 'TEMPLE',
    definition: 'A building devoted to the worship, or regarded as the dwelling place, of a god or other objects of religious reverence.',
    partOfSpeech: 'noun',
    example: 'Carved stone steps led up the mist-covered hill to an ancient mountain temple.',
    difficulty: 'hard',
  },
  {
    word: 'THUNDER',
    definition: 'A loud rumbling or crashing noise heard after a lightning flash due to the expansion of rapidly heated air.',
    partOfSpeech: 'noun',
    example: 'A deep roll of thunder echoed through the valley as the storm approached.',
    difficulty: 'hard',
  },
  {
    word: 'TUNNEL',
    definition: 'An artificial underground passage, especially one built through a hill or under a building, road, or river.',
    partOfSpeech: 'noun',
    example: 'The highway tunnel cut through two miles of solid granite mountain.',
    difficulty: 'hard',
  },
  {
    word: 'VECTOR',
    definition: 'A quantity having direction as well as magnitude, especially as determining the position of one point in space relative to another.',
    partOfSpeech: 'noun',
    example: 'Navigation computers calculated the velocity vector to adjust the spacecraft course.',
    difficulty: 'hard',
  },
  {
    word: 'VIOLET',
    definition: 'A bluish-purple color, or a small plant that typically bears sweet-scented flowers.',
    partOfSpeech: 'noun',
    example: 'Delicate wild violet blossoms sprouted in the damp forest shade.',
    difficulty: 'hard',
  },
  {
    word: 'VISION',
    definition: 'The faculty or state of being able to see, or the ability to think about or plan the future with imagination or wisdom.',
    partOfSpeech: 'noun',
    example: 'The architect presented a bold visionary plan for the eco-friendly city.',
    difficulty: 'hard',
  },
  {
    word: 'VORTEX',
    definition: 'A mass of whirling fluid or air, especially a whirlpool or whirlwind.',
    partOfSpeech: 'noun',
    example: 'The draining water spun into a tight swirling vortex at the center of the pool.',
    difficulty: 'hard',
  },
  {
    word: 'VOYAGE',
    definition: 'A long journey involving travel by sea or in space.',
    partOfSpeech: 'noun',
    example: 'The sailing crew embarked on an epic three-year voyage across the Pacific.',
    difficulty: 'hard',
  },
  {
    word: 'WIZARD',
    definition: 'A person who has magical powers, especially in legends and fairy tales; also an expert in a specific field.',
    partOfSpeech: 'noun',
    example: 'The computer wizard resolved the complex software bug within minutes.',
    difficulty: 'hard',
  },
  {
    word: 'ZENITH',
    definition: 'The time at which something is most powerful or successful; or the point in the sky directly overhead.',
    partOfSpeech: 'noun',
    example: 'The midday sun reached its radiant zenith high above the open savanna.',
    difficulty: 'hard',
  },
  {
    word: 'ARCANE',
    definition: 'Known or understood by only a small number of people with special knowledge.',
    partOfSpeech: 'adjective',
    example: 'The scholar deciphered an arcane inscription beneath the citadel.',
    difficulty: 'hard',
  },
  {
    word: 'AURORA',
    definition: 'A natural display of colored light in the sky near a polar region.',
    partOfSpeech: 'noun',
    example: 'The aurora painted green ribbons across the northern sky.',
    difficulty: 'hard',
  },
  {
    word: 'BEACON',
    definition: 'A light or other visible object used as a signal or guide.',
    partOfSpeech: 'noun',
    example: 'The mountain beacon guided the lost caravan home.',
    difficulty: 'hard',
  },
  {
    word: 'BEWITCH',
    definition: 'To cast a spell over someone or enchant them.',
    partOfSpeech: 'verb',
    example: 'The sorcerer tried to bewitch the guardian with a silver rune.',
    difficulty: 'hard',
  },
  {
    word: 'CHAINS',
    definition: 'A series of connected metal links used to bind or restrain.',
    partOfSpeech: 'noun',
    example: 'Ancient chains held the sealed gate shut beneath the ruins.',
    difficulty: 'hard',
  },
  {
    word: 'COSMIC',
    definition: 'Relating to the universe or outer space.',
    partOfSpeech: 'adjective',
    example: 'A cosmic storm illuminated the edge of the abyss.',
    difficulty: 'hard',
  },
  {
    word: 'CURSED',
    definition: 'Under a magical spell that causes harm or misfortune.',
    partOfSpeech: 'adjective',
    example: 'The cursed crown whispered to anyone who touched it.',
    difficulty: 'hard',
  },
  {
    word: 'DAGGER',
    definition: 'A short pointed weapon with a sharp blade.',
    partOfSpeech: 'noun',
    example: 'The rogue concealed a silver dagger beneath his cloak.',
    difficulty: 'hard',
  },
  {
    word: 'DREAD',
    definition: 'Great fear or apprehension.',
    partOfSpeech: 'noun',
    example: 'A feeling of dread spread through the crypt.',
    difficulty: 'hard',
  },
  {
    word: 'FABLES',
    definition: 'Short stories that teach moral lessons, often through animals.',
    partOfSpeech: 'noun',
    example: 'The library contained fables from every lost kingdom.',
    difficulty: 'hard',
  },
  {
    word: 'FORTUNE',
    definition: 'Chance or luck, especially when it affects a person’s success.',
    partOfSpeech: 'noun',
    example: 'The adventurer trusted fortune as she entered the hidden vault.',
    difficulty: 'hard',
  },
  {
    word: 'GRIMOIRE',
    definition: 'A book of magical spells and instructions.',
    partOfSpeech: 'noun',
    example: 'The grimoire revealed the secret name of the void wyrm.',
    difficulty: 'hard',
  },
  {
    word: 'INFERNO',
    definition: 'A large and dangerous fire.',
    partOfSpeech: 'noun',
    example: 'The dragon vanished into the roaring inferno.',
    difficulty: 'hard',
  },
  {
    word: 'MYSTIC',
    definition: 'Relating to mysterious spiritual or supernatural knowledge.',
    partOfSpeech: 'adjective',
    example: 'Mystic symbols covered the floor of the forgotten temple.',
    difficulty: 'hard',
  },
  {
    word: 'ORACLE',
    definition: 'A person or source believed to provide wise predictions or answers.',
    partOfSpeech: 'noun',
    example: 'The oracle warned the knight about the coming eclipse.',
    difficulty: 'hard',
  },
  {
    word: 'PHANTOM',
    definition: 'A ghost or other apparition.',
    partOfSpeech: 'noun',
    example: 'A silent phantom drifted through the abandoned hall.',
    difficulty: 'hard',
  },
  {
    word: 'RELICS',
    definition: 'Objects surviving from an earlier time with historical or magical value.',
    partOfSpeech: 'noun',
    example: 'The vault protected relics from the first Wordbinder.',
    difficulty: 'hard',
  },
  {
    word: 'RUNES',
    definition: 'Ancient letters or symbols used for writing or magic.',
    partOfSpeech: 'noun',
    example: 'Blue runes awakened along the golem’s stone armor.',
    difficulty: 'hard',
  },
  {
    word: 'SCEPTER',
    definition: 'An ornamental staff carried by a ruler as a symbol of authority.',
    partOfSpeech: 'noun',
    example: 'The archon raised the golden scepter above the throne.',
    difficulty: 'hard',
  },
  {
    word: 'SORCERY',
    definition: 'The use of supernatural power through spells or magic.',
    partOfSpeech: 'noun',
    example: 'Forbidden sorcery had changed the valley into a wasteland.',
    difficulty: 'hard',
  },
  {
    word: 'SPECTER',
    definition: 'A frightening ghost or apparition.',
    partOfSpeech: 'noun',
    example: 'The specter guarded the final stairway to the citadel.',
    difficulty: 'hard',
  },
  {
    word: 'VALIANT',
    definition: 'Showing courage or determination in the face of danger.',
    partOfSpeech: 'adjective',
    example: 'The valiant party faced the overlord without retreating.',
    difficulty: 'hard',
  },
  {
    word: 'WARLOCK',
    definition: 'A male practitioner of magic or sorcery.',
    partOfSpeech: 'noun',
    example: 'The warlock summoned a storm above the crimson caldera.',
    difficulty: 'hard',
  },
  {
    word: 'WRAITHS',
    definition: 'Ghostly or spectral beings.',
    partOfSpeech: 'noun',
    example: 'Wraiths gathered around the ruined altar at midnight.',
    difficulty: 'hard',
  },
];

export const ALL_WORDS: WordEntry[] = [
  ...EASY_WORDS,
  ...MEDIUM_WORDS,
  ...HARD_WORDS,
];

export const ALL_WORDS_MAP = new Map<string, WordEntry>(
  ALL_WORDS.map((w) => [w.word, w])
);

export function getWordPoolByDifficulty(difficulty: DifficultyLevel): WordEntry[] {
  switch (difficulty) {
    case 'easy':
      return EASY_WORDS;
    case 'medium':
      return MEDIUM_WORDS;
    case 'hard':
      return HARD_WORDS;
    default:
      return EASY_WORDS;
  }
}

/**
 * Returns a random word from the specified difficulty pool, ensuring:
 * 1. It excludes any word already solved/cracked in the player's codex.
 * 2. It excludes the immediate previous target word (excludeWord).
 * 3. Gracefully cycles back if all words in the tier have already been cracked.
 */
export function getRandomWord(
  difficulty: DifficultyLevel,
  excludeWord?: string,
  solvedWords?: string[] | Set<string>
): WordEntry {
  const pool = getWordPoolByDifficulty(difficulty);
  const solvedSet =
    solvedWords instanceof Set
      ? new Set(Array.from(solvedWords, (word) => word.toUpperCase()))
      : new Set((solvedWords || []).map((w) => w.toUpperCase()));
  const excludedWord = excludeWord?.toUpperCase();

  // 1. Try to find a word that has NEVER been solved, and is not excludeWord
  let eligible = pool.filter((w) => !solvedSet.has(w.word) && w.word !== excludedWord);

  // 2. If all other words were solved, check if any unsolved word exists
  if (eligible.length === 0) {
    eligible = pool.filter((w) => !solvedSet.has(w.word));
  }

  // 3. If literally EVERY word in this difficulty has been cracked, cycle back (excluding excludeWord)
  if (eligible.length === 0) {
    eligible = excludedWord ? pool.filter((w) => w.word !== excludedWord) : pool;
  }

  const list = eligible.length > 0 ? eligible : pool;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

/**
 * Generates an interactive letter tile bank for the player to select letters from.
 * Contains all letters of the target word (including repeat letters like both 'I's in 'SPIRIT')
 * plus unique random distractor letters.
 */
export function generateLetterPool(targetWord: string, totalCount = 10): LetterTile[] {
  const targetLetters = targetWord.toUpperCase().split('');
  const targetSet = new Set(targetLetters);

  const commonDistractors = [
    'E', 'A', 'R', 'I', 'O', 'T', 'N', 'S', 'L', 'C',
    'U', 'D', 'P', 'M', 'H', 'G', 'B', 'F', 'Y', 'W', 'K', 'V', 'Z', 'X', 'J', 'Q'
  ];

  // Choose unique distractors that are not in the target word
  const availableDistractors = commonDistractors.filter((letter) => !targetSet.has(letter));

  // Fisher-Yates Shuffle on available distractors
  for (let i = availableDistractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableDistractors[i], availableDistractors[j]] = [availableDistractors[j], availableDistractors[i]];
  }

  const distractorsNeeded = Math.max(4, totalCount - targetLetters.length);
  const chosenDistractors = availableDistractors.slice(0, distractorsNeeded);

  // Combine target letters (with repeat letters preserved) and unique distractors
  const combined = [...targetLetters, ...chosenDistractors];

  // Fisher-Yates Shuffle on combined tiles
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  return combined.map((letter, index) => ({
    id: `${letter}-${index}`,
    letter,
    isUsed: false,
  }));
}

/**
 * Validates whether the guess is acceptable for the target word length
 */
export function isValidGuess(guess: string, targetLength: number): boolean {
  if (!guess || guess.length !== targetLength) return false;
  return /^[A-Z]+$/.test(guess.toUpperCase());
}

/**
 * Standard Wordle evaluation logic:
 * Green: Correct letter in the correct position.
 * Yellow: Correct letter in the wrong position.
 * Gray: Letter not in the word.
 */
export function evaluateGuess(guess: string, target: string): GuessEvaluation[] {
  const g = guess.toUpperCase();
  const t = target.toUpperCase();
  const len = target.length;
  const result: GuessEvaluation[] = Array.from({ length: len }, (_, i) => ({
    letter: g[i] || '',
    state: 'absent',
  }));

  const targetLetterCounts: Record<string, number> = {};

  // First pass: identify correct greens
  for (let i = 0; i < len; i++) {
    if (g[i] === t[i]) {
      result[i].state = 'correct';
    } else {
      targetLetterCounts[t[i]] = (targetLetterCounts[t[i]] || 0) + 1;
    }
  }

  // Second pass: identify present yellows
  for (let i = 0; i < len; i++) {
    if (result[i].state !== 'correct') {
      const letter = g[i];
      if (targetLetterCounts[letter] && targetLetterCounts[letter] > 0) {
        result[i].state = 'present';
        targetLetterCounts[letter]--;
      } else {
        result[i].state = 'absent';
      }
    }
  }

  return result;
}

export function lookupWord(word: string): WordEntry | undefined {
  return ALL_WORDS_MAP.get(word.toUpperCase());
}
