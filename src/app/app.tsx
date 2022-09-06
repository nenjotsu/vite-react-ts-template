import { useState, useEffect } from "react";
import Logos from "components/atoms/logos";
import Card from "components/organisms/card";
import {
  BeakerIcon,
  BookmarkAltIcon,
  CakeIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  FilmIcon,
  LocationMarkerIcon,
  LockClosedIcon,
  MenuIcon,
  PencilIcon,
  PhotographIcon
} from "@heroicons/react/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import Button from "components/atoms/button";
import CopyButton from "components/molecules/copy-button";
import { useQuery } from "react-query";
import * as apiClient from "../common/http-common";

import styles from "./app.module.css";

const App = (): JSX.Element => {
  const [getId, setGetId] = useState("");
  const [getTitle, setGetTitle] = useState("");
  const [getResult, setGetResult] = useState(null);
  const fortmatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };
  const { isLoading: isLoadingTutorials, refetch: getAllTutorials } = useQuery(
    "query-users",
    async () => apiClient.users.get("/users"),
    {
      enabled: true,
      onSuccess: res => {
        const list = res.data.map(l => ({
          id: l.id,
          name: l.name,
          username: l.username,
          email: l.email,
          phone: l.phone,
          website: l.website,
          avatar: apiClient.getAvatartUrl(l.username)
        }));
        // const result = {
        //   status: res.status + "-" + res.statusText,
        //   headers: res.headers,
        //   data: res.data,
        // };
        setGetResult(list);
      },
      onError: err => {
        setGetResult(fortmatResponse(err?.response?.data || err));
      }
    }
  );
  useEffect(() => {
    if (isLoadingTutorials) setGetResult("loading...");
    console.log("getResult", typeof getResult, getResult?.length);
  }, [isLoadingTutorials]);

  async function getAllData() {
    try {
      await getAllTutorials();
    } catch (err) {
      setGetResult(fortmatResponse(err));
    }
  }
  
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h3 className={styles.headerTopTitle}>
          <span className={styles.headerTopTitleMain}>Vite + React + TS</span> @ template
        </h3>
        <h1 className={styles.headerTitle}>R.Valente</h1>
        {/* <p className={styles.headerDescription}>
          Bootstrap your web projects faster than ever. Comes with:{" "}
          <code className={styles.headerDescriptionCode}>CSS-Modules</code>,{" "}
          <code className={styles.headerDescriptionCode}>Jest</code>,{" "}
          <code className={styles.headerDescriptionCode}>Husky</code>,{" "}
          <code className={styles.headerDescriptionCode}>Commit-lint</code>,{" "}
          <code className={styles.headerDescriptionCode}>ESLint</code>,{" "}
          <code className={styles.headerDescriptionCode}>Prettier</code> and{" "}
          <code className={styles.headerDescriptionCode}>
            Atomic organization for components
          </code>
          . Configured and ready to go.
        </p> */}
        <div className={styles.viteLogoContainer}>
          <Logos.Vite className={styles.viteLogo} />
        </div>
      </header>
      <section className={styles.copy}>
        <div className={styles.copyInner}>
          <a href="https://github.com/nenjotsu/vite-react-ts-template">
            <Button>Visit on Github</Button>
          </a>
          <CopyButton text="npx degit nenjotsu/vite-react-ts-template my-app" />
        </div>
      </section>
      <section className={styles.features}>
       {getResult != null && typeof getResult != "string" && getResult?.map((props, index) => (
          <div
            key={index}
            className={styles.cardWrapper}
            style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
          >
            <Card
              title={props.name}
              description={props.username}
              Icon={props.avatar}
              callToAction={
                <Card.CallToAction as="a" href={props.avatar} target="_blank">
                  Visit documentation →
                </Card.CallToAction>
              }
            />
          </div>
        ))}
        {/* {features.map((props, index) => (
          <div
            key={index}
            className={styles.cardWrapper}
            style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
          >
            <Card
              title={props.name}
              description={props.description}
              Icon={props.logo}
              callToAction={
                <Card.CallToAction as="a" href={props.docs} target="_blank">
                  Visit documentation →
                </Card.CallToAction>
              }
            />
          </div>
        ))} */}
      </section>
      <footer className={styles.footer}>
        <a href="https://github.com/nenjotsu">
          nenjotsu©{new Date().getFullYear()}
        </a>
      </footer>
    </main>
  );
};

export default App;
