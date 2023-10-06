import { useContext } from "react";
import { Welcome } from "./sample/Welcome";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import * as microsoftTeams from "@microsoft/teams-js";

const showFunction = Boolean(config.apiName);

export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);

  const openDialog = () => {
    if(microsoftTeams.dialog.isSupported()){      
      const dialogSubmitHandler: microsoftTeams.dialog.DialogSubmitHandler = (result: any) => {
        console.log('dialog closed')
      }
      const baseUrl = `https://${window.location.hostname}:${window.location.port}`;
      const urlDialogInfo: microsoftTeams.UrlDialogInfo = {
        url: baseUrl + "/index.html#/privacy",
        title: "Privacy",
        size: {
          height: 650,
          width: 1224
        }        
      };
      microsoftTeams.dialog.url.open(urlDialogInfo, dialogSubmitHandler)
    }
  }

  return (
    <div
      className={themeString === "default" ? "light" : themeString === "dark" ? "dark" : "contrast"}
    >
      <button onClick={openDialog}>Open dialog</button>
      <Welcome showFunction={showFunction} />
    </div>
  );
}
