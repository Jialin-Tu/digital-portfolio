import masterpng from '../assets/master.jpg';
import premasterpng from '../assets/premaster.jpg';
import bscpng from '../assets/bsc.jpg';

export function Education() {
  const degrees = [
    {
      degree: "MSc Software Engineering",
      institution: "University of Limerick",
      location: "Ireland",
      description:
        "I am currently studying for a Master's degree in Software Engineering at the University of Limerick in Ireland.",
      image: masterpng
    },
    {
      degree: "Pre-Master's Programme",
      institution: "OnCampus Ireland",
      location: "Dublin, Ireland",
      description:
        "I completed a Pre-Master's Programme at OnCampus Ireland in Dublin, where I developed my academic, research and communication skills.",
      image: premasterpng
    },
    {
      degree: "BSc Software Engineering",
      institution:
        "University of Electronic Science and Technology of China, Zhongshan Institute",
      location: "China",
      description:
        "I completed my Bachelor's degree in Software Engineering, where I developed my knowledge of software development, databases and computer science.",
      image: bscpng
    }
  ];

  return (
    <section id="education" className="py-20 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Education Background</h1>
          <p className="text-muted-foreground">
            My academic journey in Software Engineering.
          </p>
        </div>

        <div className="space-y-12">
          {degrees.map((degree) => (
            <div
              key={degree.degree + degree.institution}
              className="space-y-4"
            >
              <div className="border-b border-primary/30 pb-2 flex items-center gap-4">
                <img
                  src={degree.image}
                  alt={degree.degree + ' image'}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h2 className="text-2xl">{degree.degree}</h2>
                  <p className="text-muted-foreground">
                    {degree.institution} · {degree.location}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {degree.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}