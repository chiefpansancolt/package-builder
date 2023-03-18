public with sharing class MetadataSelector {
  public class MetadataSelectorException extends Exception {
  }

  @AuraEnabled(cacheable=true)
  public static String listMetadata(String metadataType, List<String> folderNames, String packageType) {
    if (!MetadataUtility.PACKAGE_TYPES.contains(packageType)) {
      throw new MetadataSelectorException(System.Label.Invlid_Package_Types);
    }

    MetadataService.MetadataPort service = createService();
    List<fileProperty> files = new List<fileProperty>();
    List<MetadataService.ListMetadataQuery> queries = new List<MetadataService.ListMetadataQuery>();
    if (folderNames.size() != 0) {
      for (String foldername : folderNames) {
        MetadataService.ListMetadataQuery query = new MetadataService.ListMetadataQuery();
        query.folder = folderName;
        query.type_x = metadataType;
        queries.add(query);
      }
    } else {
      MetadataService.ListMetadataQuery query = new MetadataService.ListMetadataQuery();
      query.type_x = metadataType;
      queries.add(query);
    }

    MetadataService.FileProperties[] properties = service.listMetadata(queries, API_VERSION);

    if (properties != null) {
      for (MetadataService.FileProperties property : properties) {
        if (packageType == PACKAGETYPE_ALL) {
          files.add(
            new fileProperty(
              property.fileName,
              property.fullName,
              property.id,
              property.manageableState,
              property.namespacePrefix
            )
          );
        } else if (packageType == PACKAGETYPE_UNMANAGED) {
          if (property.namespacePrefix == null) {
            files.add(
              new fileProperty(
                property.fileName,
                property.fullName,
                property.id,
                property.manageableState,
                property.namespacePrefix
              )
            );
          }
        } else if (packageType == PACKAGETYPE_MANAGED) {
          if (property.namespacePrefix != null) {
            files.add(
              new fileProperty(
                property.fileName,
                property.fullName,
                property.id,
                property.manageableState,
                property.namespacePrefix
              )
            );
          }
        }
      }

      return JSON.serialize(files);
    } else {
      return 'NoData';
    }
  }

  @AuraEnabled(cacheable=true)
  public static string listFolders(String metadataType) {
    List<KeyValuePair> toReturn = new List<KeyValuePair>();
    List<Folder> folders = getFolders(metadataType);

    for (Folder f : folders) {
      toReturn.add(new KeyValuePair(f.Name, f.DeveloperName));
    }

    return JSON.serialize(toReturn);
  }

  public class fileProperty {
    public String fileName;
    public String fullName;
    public String id;
    public String manageableState;
    public String namespacePrefix;

    public fileProperty(String fileName, String fullName, String id, string manageableState, String namespacePrefix) {
      this.fileName = fileName;
      this.fullName = fullName;
      this.id = id;
      this.manageableState = manageableState;
      this.namespacePrefix = namespacePrefix;
    }
  }

  public class KeyValuePair {
    public String label;
    public String value;

    public KeyValuePair(String label, String value) {
      this.label = label;
      this.value = value;
    }
  }

  private static MetadataService.MetadataPort createService() {
    MetadataService.MetadataPort service = new MetadataService.MetadataPort();
    service.SessionHeader = new MetadataService.SessionHeader_element();
    service.SessionHeader.sessionId = MetadataUtility.getSessionIdFromVFPage(Page.SessionId);
    return service;
  }

  private static List<Folder> getFolders(String metadataType) {
    Set<String> names = new Set<String>{ metadataType };
    if (metadataType == 'EmailTemplate') {
      names.add('Email');
    }

    return [SELECT Id, Name, DeveloperName FROM Folder WHERE Type IN :names AND DeveloperName != ''];
  }

  private static final Integer API_VERSION = Integer.ValueOf(MetadataUtility.API_VERSION);
  private static final String PACKAGETYPE_ALL = 'all';
  private static final String PACKAGETYPE_MANAGED = 'managedOnly';
  private static final String PACKAGETYPE_UNMANAGED = 'unmanagedOnly';
}
